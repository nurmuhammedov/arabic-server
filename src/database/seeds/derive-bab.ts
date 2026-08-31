import { readFileSync } from 'fs'
import { join } from 'path'

import { RootClassCode } from '../../sarf/enums/sarf.enum'
import { classifyRoot } from './classify-roots'
import { canonicalArabic } from './parse-corpus'

const FATHA = 'َ'
const KASRA = 'ِ'
const DAMMA = 'ُ'
const VOWELS = new Set([FATHA, KASRA, DAMMA])
const DIACRITIC = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/

type Vowel = 'a' | 'i' | 'u'

const VOWEL_OF: Record<string, Vowel> = { [FATHA]: 'a', [KASRA]: 'i', [DAMMA]: 'u' }

/** The six bare-triliteral bābs, keyed by past and present middle-radical vowel. */
const BAB_BY_VOWELS: Record<string, string> = {
  'a-u': 'I-a-u',
  'a-i': 'I-a-i',
  'a-a': 'I-a-a',
  'i-a': 'I-i-a',
  'u-u': 'I-u-u',
  'i-i': 'I-i-i'
}

/**
 * Reads the vowel sitting on the second radical of a fully vocalised verb form.
 * Returns null when the radicals cannot be located in order, which happens for
 * weak roots whose middle letter is elided or transformed.
 */
const middleVowel = (surface: string, radicals: string): Vowel | null => {
  const roots = [...radicals]
  if (roots.length !== 3) return null

  const chars = [...surface]
  let index = 0

  for (let i = 0; i < chars.length; i++) {
    if (DIACRITIC.test(chars[i])) continue
    if (chars[i] !== roots[index]) continue

    index++
    if (index === 2) {
      // The vowel, if any, is the diacritic immediately after the second radical.
      for (let j = i + 1; j < chars.length; j++) {
        if (VOWELS.has(chars[j])) return VOWEL_OF[chars[j]]
        if (!DIACRITIC.test(chars[j])) return null
      }
      return null
    }
    if (index === 3) return null
  }

  return null
}

export interface BabAssignment {
  lemma: string
  radicals: string
  babCode: string
  tokens: number
}

/**
 * Works out which of the six bare-triliteral bābs each Form I verb belongs to,
 * by reading the middle vowel off its perfect and imperfect forms in the corpus.
 * The Quranic corpus tags every Form I verb the same way, so this is the only
 * way to recover the distinction the classical curriculum is built on.
 */
export const deriveBareBabs = (filePath = join(__dirname, 'data', 'quran-morphology.txt')): BabAssignment[] => {
  const raw = readFileSync(filePath, 'utf8')

  const past = new Map<string, Map<Vowel, number>>()
  const present = new Map<string, Map<Vowel, number>>()
  const rootOf = new Map<string, string>()
  const tokenCount = new Map<string, number>()

  const record = (store: Map<string, Map<Vowel, number>>, lemma: string, vowel: Vowel) => {
    const votes = store.get(lemma) ?? new Map<Vowel, number>()
    votes.set(vowel, (votes.get(vowel) ?? 0) + 1)
    store.set(lemma, votes)
  }

  for (const line of raw.split('\n')) {
    const parts = line.split('\t')
    if (parts.length < 4 || parts[2] !== 'V') continue

    const flags = new Set<string>()
    const values: Record<string, string> = {}
    for (const token of parts[3].split('|')) {
      const colon = token.indexOf(':')
      if (colon > 0) values[token.slice(0, colon)] = token.slice(colon + 1)
      else if (token) flags.add(token)
    }

    if (values.VF !== '1') continue

    // Passive forms carry the فُعِلَ / يُفْعَلُ vowels regardless of bāb, and doubled
    // roots merge their last two radicals, so neither can be read for the vowel.
    if (flags.has('PASS')) continue

    const lemma = values.LEM ? canonicalArabic(values.LEM) : undefined
    const radicals = values.ROOT ? canonicalArabic(values.ROOT) : undefined
    if (!lemma || !radicals) continue

    if (classifyRoot(radicals) === RootClassCode.DOUBLED) continue

    rootOf.set(lemma, radicals)
    tokenCount.set(lemma, (tokenCount.get(lemma) ?? 0) + 1)

    const surface = canonicalArabic(parts[1])
    const vowel = middleVowel(surface, radicals)
    if (!vowel) continue

    if (flags.has('PERF')) record(past, lemma, vowel)
    else if (flags.has('IMPF')) record(present, lemma, vowel)
  }

  const dominant = (votes: Map<Vowel, number> | undefined): Vowel | undefined =>
    votes ? [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0] : undefined

  const assignments: BabAssignment[] = []
  for (const [lemma, radicals] of rootOf) {
    const pastVowel = dominant(past.get(lemma))
    const presentVowel = dominant(present.get(lemma))
    if (!pastVowel || !presentVowel) continue

    const babCode = BAB_BY_VOWELS[`${pastVowel}-${presentVowel}`]
    if (!babCode) continue

    assignments.push({ lemma, radicals, babCode, tokens: tokenCount.get(lemma) ?? 0 })
  }

  return assignments
}
