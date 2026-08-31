import { PartOfSpeech } from '../../words/enums/word.enum'
import { parseCorpus } from './parse-corpus'

/**
 * Measures how far root + template knowledge actually carries a learner.
 * Run with `pnpm analyze:morphology`.
 */
const { words, totalTokens } = parseCorpus()

const pct = (n: number) => ((100 * n) / totalTokens).toFixed(1) + '%'
const tokens = (list: typeof words) => list.reduce((sum, w) => sum + w.frequency, 0)

const rootless = words.filter((w) => !w.radicals)
const rooted = words.filter((w) => w.radicals)
const verbs = words.filter((w) => w.pos === PartOfSpeech.VERB)
const nouns = words.filter((w) => w.pos === PartOfSpeech.NOUN)
const particles = words.filter((w) => w.pos === PartOfSpeech.PARTICLE)

console.log('=== What the corpus is made of ===')
console.log(`total lemma tokens      : ${totalTokens}`)
console.log(`lemmas                  : ${words.length}`)
console.log(`  with a root           : ${rooted.length}  (${pct(tokens(rooted))} of tokens)`)
console.log(`  without a root        : ${rootless.length}  (${pct(tokens(rootless))} of tokens)`)
console.log()
console.log(`verbs                   : ${verbs.length} lemmas, ${pct(tokens(verbs))} of tokens`)
console.log(`nouns / adjectives      : ${nouns.length} lemmas, ${pct(tokens(nouns))} of tokens`)
console.log(`particles               : ${particles.length} lemmas, ${pct(tokens(particles))} of tokens`)

console.log()
console.log('=== Verb forms (the abwab), by share of verb tokens ===')
const verbTokens = tokens(verbs)
const byForm = new Map<number | string, { lemmas: number; tokens: number }>()
for (const verb of verbs) {
  const key = verb.verbForm ?? 'unknown'
  const entry = byForm.get(key) ?? { lemmas: 0, tokens: 0 }
  entry.lemmas++
  entry.tokens += verb.frequency
  byForm.set(key, entry)
}
const ROMAN: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII'
}
for (const [form, entry] of [...byForm.entries()].sort((a, b) => b[1].tokens - a[1].tokens)) {
  const label = typeof form === 'number' ? `Form ${ROMAN[form] ?? form}` : 'unknown'
  const share = ((100 * entry.tokens) / verbTokens).toFixed(1)
  console.log(
    `  ${label.padEnd(10)} ${String(entry.lemmas).padStart(4)} lemmas  ${String(entry.tokens).padStart(5)} tokens  ${share.padStart(5)}% of verbs`
  )
}

console.log()
console.log('=== How far do N roots carry you? ===')
const rootTokens = new Map<string, number>()
for (const word of rooted) {
  rootTokens.set(word.radicals!, (rootTokens.get(word.radicals!) ?? 0) + word.frequency)
}
const rankedRoots = [...rootTokens.entries()].sort((a, b) => b[1] - a[1])
let running = 0
const marks = new Set([50, 100, 200, 300, 500, 750, 1000, 1651])
rankedRoots.forEach(([, n], index) => {
  running += n
  if (marks.has(index + 1)) {
    console.log(`  top ${String(index + 1).padStart(4)} roots -> ${pct(running).padStart(6)} of all tokens`)
  }
})

console.log()
console.log('=== Words whose meaning a template does NOT predict ===')
const noPattern = rooted.filter((w) => !w.wazn)
console.log(`  weak/irregular, no derivable wazn : ${noPattern.length} lemmas, ${pct(tokens(noPattern))} of tokens`)
console.log(`  rootless particles and pronouns   : ${rootless.length} lemmas, ${pct(tokens(rootless))} of tokens`)
const unpredictable = tokens(noPattern) + tokens(rootless)
console.log(`  combined                          : ${pct(unpredictable)} of tokens must simply be memorised`)
