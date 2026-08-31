import { parseCorpus } from './parse-corpus'

/** Ad-hoc check that the corpus parser produces sane numbers. Run with `pnpm inspect:corpus`. */
const { roots, words, totalTokens } = parseCorpus()

console.log('total tokens :', totalTokens)
console.log('lemmas       :', words.length)
console.log('roots        :', roots.length)
console.log(
  'occurrences  :',
  words.reduce((sum, w) => sum + w.occurrences.length, 0)
)
console.log()

for (const rank of [50, 100, 250, 500, 1000, 2000, words.length]) {
  const word = words[rank - 1]
  console.log(`  rank ${String(rank).padStart(5)}  coverage ${(word.cumulativeCoverage * 100).toFixed(1)}%`)
}

console.log()
console.log('top 15 lemmas:')
for (const word of words.slice(0, 15)) {
  console.log(
    `  ${word.lemma.padEnd(14)} n=${String(word.frequency).padStart(4)}  ` +
      `plain=${word.arabicPlain.padEnd(10)} pos=${word.pos.padEnd(8)} ` +
      `root=${word.radicals ?? '-'} detail=${word.posDetail ?? '-'} vf=${word.verbForm ?? '-'}`
  )
}

console.log()
console.log('largest root families:')
for (const root of [...roots].sort((a, b) => b.wordCount - a.wordCount).slice(0, 8)) {
  const family = words
    .filter((w) => w.radicals === root.radicals)
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 8)
    .map((w) => w.lemma)
  console.log(`  ${root.radicals}  ${root.wordCount} lemmas, ${root.occurrenceCount} tokens: ${family.join(' ')}`)
}

console.log()
console.log('sample occurrence:', JSON.stringify(words[20].occurrences[0]))
