import { ROOT_GLOSSES, WORD_GLOSSES } from './glossary'
import { canonicalArabic, normalizeArabic, parseCorpus } from './parse-corpus'

/** Reports glossary keys that do not match a corpus lemma, with the likely intended spelling. */
const { words, roots } = parseCorpus()

const lemmas = new Set(words.map((w) => w.lemma))
const byPlain = new Map<string, string[]>()
for (const word of words) {
  const bucket = byPlain.get(word.arabicPlain)
  if (bucket) bucket.push(word.lemma)
  else byPlain.set(word.arabicPlain, [word.lemma])
}

const seen = new Set<string>()
let duplicates = 0
let missing = 0

console.log('WORD_GLOSSES')
for (const [raw] of WORD_GLOSSES) {
  const lemma = canonicalArabic(raw)
  if (seen.has(lemma)) {
    console.log(`  DUPLICATE  ${lemma}`)
    duplicates++
  }
  seen.add(lemma)

  if (lemmas.has(lemma)) continue

  missing++
  const candidates = byPlain.get(normalizeArabic(lemma)) ?? []
  const escaped = [...lemma].map((c) => c.codePointAt(0)!.toString(16).padStart(4, '0')).join(' ')
  console.log(`  NO MATCH   ${lemma}  [${escaped}]`)
  for (const candidate of candidates.slice(0, 3)) {
    const cand = [...candidate].map((c) => c.codePointAt(0)!.toString(16).padStart(4, '0')).join(' ')
    console.log(`             -> ${candidate}  [${cand}]`)
  }
  if (!candidates.length) console.log('             -> (no candidate with the same skeleton)')
}

const radicals = new Set(roots.map((r) => r.radicals))
let missingRoots = 0
console.log('\nROOT_GLOSSES')
for (const [rawRadical] of ROOT_GLOSSES) {
  const radical = canonicalArabic(rawRadical)
  if (!radicals.has(radical)) {
    console.log(`  NO MATCH   ${radical}`)
    missingRoots++
  }
}

console.log(
  `\nwords: ${WORD_GLOSSES.length} entries, ${duplicates} duplicate, ${missing} unmatched` +
    `\nroots: ${ROOT_GLOSSES.length} entries, ${missingRoots} unmatched`
)
