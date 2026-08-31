import { readFileSync } from 'fs'
import { join } from 'path'

import { IrabCase, IrabCause } from '../../nahw/enums/nahw.enum'
import { canonicalArabic, normalizeArabic } from './parse-corpus'

/** Standalone prepositions; the attached ones are caught through their PREF tag. */
const JAR_LEMMAS = new Set(['من', 'في', 'علي', 'الي', 'عن', 'حتي', 'مع', 'لدي'])
const JAR_PREFIXES = new Set(['ب', 'ل', 'ك'])
const INNA_LEMMAS = new Set(['ان', 'كان', 'لكن', 'ليت', 'لعل', 'كانّ'])
/** كانَ and its sisters, restricted to the ones the Quran actually uses as verbs. */
const KANA_LEMMAS = new Set(['كان', 'ليس', 'اصبح', 'ظل', 'دام', 'زال'])

const CASE_OF: Record<string, IrabCase> = {
  NOM: IrabCase.NOMINATIVE,
  ACC: IrabCase.ACCUSATIVE,
  GEN: IrabCase.GENITIVE
}

interface Segment {
  form: string
  pos: string
  values: Record<string, string>
  flags: Set<string>
}

interface Word {
  sura: number
  ayah: number
  index: number
  segments: Segment[]
}

export interface HarvestedIrab {
  sura: number
  ayah: number
  wordIndex: number
  surfaceForm: string
  irabCase: IrabCase
  cause: IrabCause
  triggerForm?: string
  ayahWords: number
}

const parseSegment = (line: string) => {
  const parts = line.split('\t')
  if (parts.length < 4) return null

  const [sura, ayah, index] = parts[0].split(':').map(Number)
  if (!Number.isFinite(sura)) return null

  const values: Record<string, string> = {}
  const flags = new Set<string>()
  for (const token of parts[3].split('|')) {
    const colon = token.indexOf(':')
    if (colon > 0) values[token.slice(0, colon)] = token.slice(colon + 1)
    else if (token) flags.add(token)
  }

  return { sura, ayah, index, segment: { form: canonicalArabic(parts[1]), pos: parts[2], values, flags } }
}

const lemmaOf = (segment: Segment) => (segment.values.LEM ? normalizeArabic(segment.values.LEM) : '')

const hasVerb = (word: Word | undefined) => word?.segments.some((s) => s.pos === 'V') ?? false

const endsWithJar = (word: Word | undefined) => {
  const last = word?.segments[word.segments.length - 1]
  return !!last && last.pos === 'P' && JAR_LEMMAS.has(lemmaOf(last))
}

const isInna = (word: Word | undefined) =>
  word?.segments.some((s) => s.pos === 'P' && INNA_LEMMAS.has(lemmaOf(s))) ?? false

/**
 * كانَ does not take a fāʿil or a mafʿūl bih. Without this the drill would call
 * its ism a doer and its khabar an object, contradicting the kana-inna lesson.
 */
const isKana = (word: Word | undefined) =>
  word?.segments.some((s) => s.pos === 'V' && KANA_LEMMAS.has(lemmaOf(s))) ?? false

const isPlainNoun = (word: Word | undefined) =>
  !!word && word.segments.some((s) => s.pos === 'N') && !hasVerb(word) && !endsWithJar(word)

/** Carries ال, or is a proper noun, which is definite without it. */
const isDefinite = (word: Word | undefined) =>
  word?.segments.some((s) => s.flags.has('DET') || s.flags.has('PN')) ?? false

/**
 * Carries وَ or فَ. A naʿt never does, so a matching case after one of these is a
 * maʿṭūf riding on an earlier word rather than an adjective describing this one.
 */
const hasConjunction = (word: Word | undefined) =>
  word?.segments.some((s) => s.flags.has('CONJ') && s.flags.has('PREF')) ?? false

/** Carries tanwin, so it cannot be the first half of a possession chain. */
const isIndefinite = (word: Word | undefined) => word?.segments.some((s) => s.flags.has('INDEF')) ?? false

/** The case tag sitting on a word's nominal core, if it has one. */
const caseOf = (word: Word | undefined): IrabCase | undefined => {
  const core = word?.segments.find((s) => s.pos === 'N' && !s.flags.has('PREF') && !s.flags.has('SUFF'))
  const tag = core && ['NOM', 'ACC', 'GEN'].find((candidate) => core.flags.has(candidate))
  return tag ? CASE_OF[tag] : undefined
}

/**
 * A maʿṭūf needs something in the same ayah to ride on. A verse-initial وَ joins
 * sentences instead of nouns, so those words keep whatever role they play here.
 */
const isCoordinated = (word: Word, previous: Word | undefined, irabCase: IrabCase) =>
  hasConjunction(word) && !!previous && caseOf(previous) === irabCase

/**
 * Two same-case words in a row leave the anchor ambiguous — in 2:22 the sky is
 * joined to the earth, not to the bed between them — so no anchor is claimed.
 */
const coordinationTrigger = (previous: Word | undefined, beforePrevious: Word | undefined, irabCase: IrabCase) =>
  caseOf(beforePrevious) === irabCase ? undefined : previous?.segments.map((s) => s.form).join('')

/**
 * Pulls real Quranic words whose ending has an identifiable cause. Only the
 * patterns that can be read off the annotation with confidence are kept — a word
 * whose cause cannot be pinned down is skipped rather than guessed at, so the
 * drill never teaches something wrong.
 */
export const harvestIrab = (filePath = join(__dirname, 'data', 'quran-morphology.txt')): HarvestedIrab[] => {
  const raw = readFileSync(filePath, 'utf8')

  // Rebuild orthographic words, since a case ending is caused by the previous word.
  const words: Word[] = []
  let current: Word | null = null

  for (const line of raw.split('\n')) {
    const parsed = parseSegment(line)
    if (!parsed) continue

    if (!current || current.sura !== parsed.sura || current.ayah !== parsed.ayah || current.index !== parsed.index) {
      current = { sura: parsed.sura, ayah: parsed.ayah, index: parsed.index, segments: [] }
      words.push(current)
    }
    current.segments.push(parsed.segment)
  }

  const ayahLength = new Map<string, number>()
  for (const word of words) {
    const key = `${word.sura}:${word.ayah}`
    ayahLength.set(key, Math.max(ayahLength.get(key) ?? 0, word.index))
  }

  const results: HarvestedIrab[] = []

  words.forEach((word, position) => {
    const previous = position > 0 && words[position - 1].ayah === word.ayah ? words[position - 1] : undefined
    const following = words[position + 1]?.ayah === word.ayah ? words[position + 1] : undefined
    const beforePrevious = position > 1 && words[position - 2].ayah === word.ayah ? words[position - 2] : undefined

    // The case sits on the nominal core of the word, not on its prefixes.
    const core = word.segments.find(
      (segment) => segment.pos === 'N' && !segment.flags.has('PREF') && !segment.flags.has('SUFF')
    )
    if (!core) return

    const tag = ['NOM', 'ACC', 'GEN'].find((candidate) => core.flags.has(candidate))
    if (!tag) return

    // A munādā after a verb of speech and a ẓarf after any verb both sit in the
    // accusative for their own reasons, so the object rule below would mislabel
    // them. They are dropped rather than taught as something they are not.
    // ATT marks the هَا of أَيُّهَا, which is a vocative even where يا is left out.
    const isVocative = word.segments.some((segment) => segment.flags.has('VOC') || segment.flags.has('ATT'))
    const isAdverb = core.flags.has('LOC') || core.flags.has('T')
    if (isVocative || isAdverb) return

    const irabCase = CASE_OF[tag]
    const attachedJar = word.segments.find((segment) => segment.flags.has('PREF') && JAR_PREFIXES.has(lemmaOf(segment)))

    let cause = IrabCause.UNKNOWN
    let triggerForm: string | undefined

    if (irabCase === IrabCase.GENITIVE) {
      if (attachedJar) {
        cause = IrabCause.PREPOSITION
        triggerForm = attachedJar.form
      } else if (endsWithJar(previous)) {
        cause = IrabCause.PREPOSITION
        triggerForm = previous?.segments[previous.segments.length - 1].form
      } else if (isCoordinated(word, previous, irabCase)) {
        cause = IrabCause.CONJUNCTION
        triggerForm = coordinationTrigger(previous, beforePrevious, irabCase)
      } else if (isPlainNoun(previous)) {
        // A chain needs a bare first noun; two definite nouns in a row is an
        // adjective agreeing with what it describes, not a possession chain.
        if (!isDefinite(previous) && !isIndefinite(previous)) {
          cause = IrabCause.IDAFA
          triggerForm = previous?.segments.map((s) => s.form).join('')
        } else if (caseOf(previous) === IrabCase.GENITIVE) {
          cause = IrabCause.ADJECTIVE
          triggerForm = previous?.segments.map((s) => s.form).join('')
        }
      }
    } else if (irabCase === IrabCase.ACCUSATIVE) {
      if (isCoordinated(word, previous, irabCase)) {
        cause = IrabCause.CONJUNCTION
        triggerForm = coordinationTrigger(previous, beforePrevious, irabCase)
      } else if (isInna(previous)) {
        cause = IrabCause.INNA
        triggerForm = previous?.segments.map((s) => s.form).join('')
      } else if (isKana(previous)) {
        // When a verb follows, the khabar of kāna is that whole verbal sentence
        // and this noun is its fronted object, so the cause is not clear-cut.
        if (!hasVerb(following)) {
          cause = IrabCause.KANA
          triggerForm = previous?.segments.map((s) => s.form).join('')
        }
      } else if (hasVerb(previous)) {
        cause = IrabCause.OBJECT
        triggerForm = previous?.segments.map((s) => s.form).join('')
      } else if (
        isPlainNoun(previous) &&
        caseOf(previous) === IrabCase.ACCUSATIVE &&
        isDefinite(previous) === isDefinite(word)
      ) {
        cause = IrabCause.ADJECTIVE
        triggerForm = previous?.segments.map((s) => s.form).join('')
      }
    } else if (irabCase === IrabCase.NOMINATIVE) {
      if (isCoordinated(word, previous, irabCase)) {
        cause = IrabCause.CONJUNCTION
        triggerForm = coordinationTrigger(previous, beforePrevious, irabCase)
      } else if (isKana(previous)) {
        cause = IrabCause.KANA
        triggerForm = previous?.segments.map((s) => s.form).join('')
      } else if (hasVerb(previous)) {
        cause = IrabCause.SUBJECT
        triggerForm = previous?.segments.map((s) => s.form).join('')
      } else if (!previous && isDefinite(word)) {
        // A mubtada' is normally definite. Without that check, verse-initial
        // particles the corpus happens to tag as nouns get taught as topics.
        cause = IrabCause.TOPIC
      }
    }

    if (cause === IrabCause.UNKNOWN) return

    results.push({
      sura: word.sura,
      ayah: word.ayah,
      wordIndex: word.index,
      surfaceForm: word.segments.map((segment) => segment.form).join(''),
      irabCase,
      cause,
      triggerForm,
      ayahWords: ayahLength.get(`${word.sura}:${word.ayah}`) ?? 0
    })
  })

  return results
}
