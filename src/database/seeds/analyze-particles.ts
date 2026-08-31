import { readFileSync } from 'fs'
import { join } from 'path'

import { canonicalArabic } from './parse-corpus'

/**
 * Sizes the ḥurūf module honestly. The lemma list undercounts particles twice
 * over: it mixes proper nouns in with the rootless words, and it drops attached
 * particles (و ف ب ل ال س) entirely because they are tagged as prefixes.
 * Run with `pnpm analyze:particles`.
 */
const raw = readFileSync(join(__dirname, 'data', 'quran-morphology.txt'), 'utf8')

interface Segment {
  form: string
  pos: string
  values: Record<string, string>
  flags: Set<string>
}

const segments: Segment[] = []
for (const line of raw.split('\n')) {
  const parts = line.split('\t')
  if (parts.length < 4) continue

  const values: Record<string, string> = {}
  const flags = new Set<string>()
  for (const token of parts[3].split('|')) {
    const colon = token.indexOf(':')
    if (colon > 0) values[token.slice(0, colon)] = token.slice(colon + 1)
    else if (token) flags.add(token)
  }
  segments.push({ form: canonicalArabic(parts[1]), pos: parts[2], values, flags })
}

const total = segments.length
const pct = (n: number) => ((100 * n) / total).toFixed(1) + '%'

const standalone = segments.filter((s) => !s.flags.has('PREF') && !s.flags.has('SUFF'))
const prefixes = segments.filter((s) => s.flags.has('PREF'))
const suffixes = segments.filter((s) => s.flags.has('SUFF'))

console.log(`total segments      : ${total}`)
console.log(`  standalone        : ${standalone.length}  ${pct(standalone.length)}`)
console.log(`  attached prefixes : ${prefixes.length}  ${pct(prefixes.length)}`)
console.log(`  attached suffixes : ${suffixes.length}  ${pct(suffixes.length)}`)

const tally = (list: Segment[], key: (s: Segment) => string | undefined) => {
  const counts = new Map<string, number>()
  for (const segment of list) {
    const value = key(segment)
    if (!value) continue
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

console.log('\n=== Attached prefixes, by lemma ===')
const prefixLemmas = tally(prefixes, (s) => s.values.LEM)
for (const [lemma, count] of prefixLemmas.slice(0, 15)) {
  console.log(`  ${lemma.padEnd(6)} ${String(count).padStart(6)}  ${pct(count)}`)
}
console.log(`  distinct prefix lemmas: ${prefixLemmas.length}`)

// Suffixes split two ways: attached pronouns belong to the huruf module, while
// verb and noun endings (وا, ون) are conjugation and belong to sarf.
const pronounSuffixes = suffixes.filter((s) => s.flags.has('PRON'))
const inflectionSuffixes = suffixes.filter((s) => !s.flags.has('PRON'))

console.log('\n=== Attached pronoun suffixes ===')
const suffixForms = tally(pronounSuffixes, (s) => s.form)
for (const [form, count] of suffixForms.slice(0, 12)) {
  console.log(`  ${form.padEnd(8)} ${String(count).padStart(6)}  ${pct(count)}`)
}
console.log(
  `  distinct pronoun-suffix forms: ${suffixForms.length}, ${pronounSuffixes.length} tokens ${pct(pronounSuffixes.length)}`
)
console.log(
  `  inflection endings (sarf, not huruf): ${inflectionSuffixes.length} tokens ${pct(inflectionSuffixes.length)}`
)

// Standalone function words: rootless, and not a proper noun.
const functionWords = tally(
  standalone.filter((s) => !s.values.ROOT && !s.flags.has('PN') && s.values.LEM),
  (s) => s.values.LEM
)
const functionTokens = functionWords.reduce((sum, [, n]) => sum + n, 0)

const properNouns = tally(
  standalone.filter((s) => !s.values.ROOT && s.flags.has('PN') && s.values.LEM),
  (s) => s.values.LEM
)
const properTokens = properNouns.reduce((sum, [, n]) => sum + n, 0)

console.log('\n=== Standalone rootless words, split ===')
console.log(`  function words : ${functionWords.length} lemmas, ${functionTokens} tokens  ${pct(functionTokens)}`)
console.log(`  proper nouns   : ${properNouns.length} lemmas, ${properTokens} tokens  ${pct(properTokens)}`)

const moduleItems = functionWords.length + prefixLemmas.length + suffixForms.length
const moduleTokens = functionTokens + prefixes.length + pronounSuffixes.length

console.log('\n=== What a huruf module would actually cover ===')
console.log(`  items to learn : ${moduleItems}`)
console.log(`  tokens covered : ${moduleTokens}  ${pct(moduleTokens)} of every segment in the Quran`)
