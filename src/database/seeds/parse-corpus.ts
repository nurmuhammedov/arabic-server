import { readFileSync } from 'fs'
import { join } from 'path'

import { DIACRITIC, canonicalArabic, normalizeArabic } from '../../common/helpers/arabic.helper'
import { PartOfSpeech } from '../../words/enums/word.enum'

export { canonicalArabic, normalizeArabic } from '../../common/helpers/arabic.helper'

/** Hamza carriers and weak-letter variants count as the same radical when matching. */
const foldRadical = (char: string): string => {
  if ('\u0622\u0623\u0625\u0671\u0621\u0624\u0626'.includes(char)) return '\u0621'
  if (char === '\u0649') return '\u064A'
  if (char === '\u0629') return '\u0647'
  return char
}

/** The model root \u0641-\u0639-\u0644, with the last radical repeated for quadriliterals. */
const MODEL_RADICALS = ['\u0641', '\u0639', '\u0644', '\u0644']

/**
 * Derive the template (wazn) by replacing each root radical with the model root
 * in order, so \u0645\u064E\u0643\u0652\u062A\u064F\u0648\u0628 on \u0643-\u062A-\u0628 becomes \u0645\u064E\u0641\u0652\u0639\u064F\u0648\u0644. Returns null for weak roots
 * whose radicals are elided or transformed in the surface form.
 */
const SUKUN = 'ْ'
const SHORT_VOWELS = ['َ', 'ُ', 'ِ']

/**
 * The shape of a template, ignoring how it happened to be written. The corpus
 * spells one template several ways — sukūn is often left off, and a trailing
 * short vowel is a mood or case marker rather than part of the shape — so
 * يُفْعِلُ, يُفعِل and يُفْعِلْ are one template written three ways.
 *
 * Verbs and nouns are keyed apart because that trailing vowel is the only thing
 * separating أَفْعَلَ "he informed" from أَفْعَل "greater".
 */
export const waznKey = (wazn: string, isVerb: boolean): string => {
  let shape = canonicalArabic(wazn).split(SUKUN).join('')
  while (shape.length > 0 && SHORT_VOWELS.includes(shape[shape.length - 1])) shape = shape.slice(0, -1)
  return `${isVerb ? 'V' : 'N'}:${shape}`
}

/**
 * Collapses those spellings onto the best-attested one, so a template is a
 * single teachable unit instead of half a dozen near-duplicates.
 */
export const canonicalWazns = (entries: readonly { wazn?: string; isVerb: boolean }[]): Map<string, string> => {
  const tally = new Map<string, Map<string, number>>()
  for (const entry of entries) {
    if (!entry.wazn) continue
    const key = waznKey(entry.wazn, entry.isVerb)
    const variants = tally.get(key) ?? new Map<string, number>()
    variants.set(entry.wazn, (variants.get(entry.wazn) ?? 0) + 1)
    tally.set(key, variants)
  }

  const chosen = new Map<string, string>()
  const taken = new Set<string>()
  for (const [key, variants] of tally) {
    // Ties go to the longer spelling, which is the one that writes its sukūn.
    const ranked = [...variants.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    // A verb and a noun can land on the same spelling; the column is unique, so
    // the second group takes its next-best variant rather than colliding.
    const pick = ranked.find(([variant]) => !taken.has(variant))?.[0] ?? ranked[0][0]
    taken.add(pick)
    chosen.set(key, pick)
  }
  return chosen
}

export const deriveWazn = (lemma: string, radicals: string): string | null => {
  const roots = [...radicals].map(foldRadical)
  const out: string[] = []
  let index = 0

  for (const char of lemma) {
    if (DIACRITIC.test(char)) {
      out.push(char)
      continue
    }
    if (index < roots.length && foldRadical(char) === roots[index]) {
      out.push(MODEL_RADICALS[index])
      index++
    } else {
      out.push(char)
    }
  }

  return index === roots.length ? out.join('') : null
}

export interface ParsedRoot {
  radicals: string
  letterCount: number
  occurrenceCount: number
  wordCount: number
}

export interface ParsedOccurrence {
  sura: number
  ayah: number
  wordIndex: number
  surfaceForm: string
}

export interface ParsedWord {
  lemma: string
  arabicPlain: string
  pos: PartOfSpeech
  posDetail?: string
  verbForm?: number
  radicals?: string
  wazn?: string
  frequency: number
  frequencyRank: number
  cumulativeCoverage: number
  occurrences: ParsedOccurrence[]
}

export interface ParsedAyah {
  sura: number
  ayah: number
  text: string
  wordCount: number
}

export interface ParsedCorpus {
  roots: ParsedRoot[]
  words: ParsedWord[]
  ayahs: ParsedAyah[]
  totalTokens: number
}

const POS_MAP: Record<string, PartOfSpeech> = {
  N: PartOfSpeech.NOUN,
  V: PartOfSpeech.VERB,
  P: PartOfSpeech.PARTICLE
}

/** Sub-categories worth surfacing to the learner; everything else is inflection noise. */
const MEANINGFUL_TAGS = new Set([
  'PN',
  'ADJ',
  'PRON',
  'REL',
  'DEM',
  'ACT_PCPL',
  'PASS_PCPL',
  'VN',
  'ADV',
  'NEG',
  'COND',
  'INTG',
  'VOC',
  'EMPH'
])

interface Segment {
  sura: number
  ayah: number
  wordIndex: number
  form: string
  pos: string
  values: Record<string, string>
  flags: Set<string>
}

const parseLine = (line: string): Segment | null => {
  const parts = line.split('\t')
  if (parts.length < 4) return null

  const [sura, ayah, wordIndex] = parts[0].split(':').map(Number)
  if (!Number.isFinite(sura) || !Number.isFinite(ayah) || !Number.isFinite(wordIndex)) return null

  const values: Record<string, string> = {}
  const flags = new Set<string>()

  for (const token of parts[3].split('|')) {
    const colon = token.indexOf(':')
    if (colon > 0) {
      values[token.slice(0, colon)] = token.slice(colon + 1)
    } else if (token) {
      flags.add(token)
    }
  }

  if (values.LEM) values.LEM = canonicalArabic(values.LEM)
  if (values.ROOT) values.ROOT = canonicalArabic(values.ROOT)

  return { sura, ayah, wordIndex, form: canonicalArabic(parts[1]), pos: parts[2], values, flags }
}

export const parseCorpus = (filePath = join(__dirname, 'data', 'quran-morphology.txt')): ParsedCorpus => {
  const raw = readFileSync(filePath, 'utf8')

  const lemmaFrequency = new Map<string, number>()
  const lemmaSegments = new Map<string, Segment[]>()
  const rootOccurrences = new Map<string, number>()
  // sura:ayah -> wordIndex -> concatenated segments, so verse text stays aligned with positions.
  const verses = new Map<string, Map<number, string>>()

  for (const line of raw.split('\n')) {
    if (!line.trim()) continue

    const segment = parseLine(line)
    if (!segment) continue

    const verseKey = `${segment.sura}:${segment.ayah}`
    let verse = verses.get(verseKey)
    if (!verse) {
      verse = new Map()
      verses.set(verseKey, verse)
    }
    verse.set(segment.wordIndex, (verse.get(segment.wordIndex) ?? '') + segment.form)

    // Attached prefixes (ال، و، ب) and pronoun suffixes are grammar, not vocabulary.
    if (segment.flags.has('PREF') || segment.flags.has('SUFF')) continue

    const lemma = segment.values.LEM
    if (!lemma) continue

    lemmaFrequency.set(lemma, (lemmaFrequency.get(lemma) ?? 0) + 1)

    const bucket = lemmaSegments.get(lemma)
    if (bucket) bucket.push(segment)
    else lemmaSegments.set(lemma, [segment])

    const radicals = segment.values.ROOT
    if (radicals) rootOccurrences.set(radicals, (rootOccurrences.get(radicals) ?? 0) + 1)
  }

  const totalTokens = [...lemmaFrequency.values()].reduce((sum, n) => sum + n, 0)

  const ranked = [...lemmaFrequency.entries()].sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1]
    return a[0].localeCompare(b[0])
  })

  const rootWordCount = new Map<string, number>()
  const words: ParsedWord[] = []
  let running = 0

  ranked.forEach(([lemma, frequency], index) => {
    running += frequency
    const segments = lemmaSegments.get(lemma) ?? []

    // A lemma can be tagged with several POS classes across the corpus; take the dominant one.
    const posCounts = new Map<string, number>()
    const tagCounts = new Map<string, number>()
    const verbFormCounts = new Map<number, number>()
    let radicals: string | undefined

    for (const segment of segments) {
      posCounts.set(segment.pos, (posCounts.get(segment.pos) ?? 0) + 1)
      radicals ??= segment.values.ROOT

      const verbForm = Number(segment.values.VF)
      if (Number.isFinite(verbForm)) {
        verbFormCounts.set(verbForm, (verbFormCounts.get(verbForm) ?? 0) + 1)
      }

      for (const flag of segment.flags) {
        if (MEANINGFUL_TAGS.has(flag)) tagCounts.set(flag, (tagCounts.get(flag) ?? 0) + 1)
      }
    }

    const dominant = <T>(counts: Map<T, number>): T | undefined =>
      [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]

    if (radicals) rootWordCount.set(radicals, (rootWordCount.get(radicals) ?? 0) + 1)

    words.push({
      lemma,
      arabicPlain: normalizeArabic(lemma),
      pos: POS_MAP[dominant(posCounts) ?? 'N'] ?? PartOfSpeech.NOUN,
      posDetail: dominant(tagCounts),
      verbForm: dominant(verbFormCounts),
      radicals,
      wazn: radicals ? (deriveWazn(lemma, radicals) ?? undefined) : undefined,
      frequency,
      frequencyRank: index + 1,
      cumulativeCoverage: running / totalTokens,
      occurrences: segments.map((segment) => ({
        sura: segment.sura,
        ayah: segment.ayah,
        wordIndex: segment.wordIndex,
        surfaceForm: segment.form
      }))
    })
  })

  // One template, one spelling — see canonicalWazns.
  const isVerb = (word: ParsedWord) => word.pos === PartOfSpeech.VERB
  const canonical = canonicalWazns(words.map((word) => ({ wazn: word.wazn, isVerb: isVerb(word) })))
  for (const word of words) {
    if (word.wazn) word.wazn = canonical.get(waznKey(word.wazn, isVerb(word))) ?? word.wazn
  }

  const roots: ParsedRoot[] = [...rootOccurrences.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([radicals, occurrenceCount]) => ({
      radicals,
      letterCount: [...radicals].length,
      occurrenceCount,
      wordCount: rootWordCount.get(radicals) ?? 0
    }))

  const ayahs: ParsedAyah[] = [...verses.entries()]
    .map(([key, verse]) => {
      const [sura, ayah] = key.split(':').map(Number)
      const ordered = [...verse.entries()].sort((a, b) => a[0] - b[0])
      return { sura, ayah, text: ordered.map(([, text]) => text).join(' '), wordCount: ordered.length }
    })
    .sort((a, b) => a.sura - b.sura || a.ayah - b.ayah)

  return { roots, words, ayahs, totalTokens }
}
