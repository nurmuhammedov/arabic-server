import { writeFileSync } from 'fs'
import { join } from 'path'

import { parseCorpus } from './parse-corpus'

/** Writes the highest-frequency lemmas as compact TSV so glosses can be authored against exact keys. */
const limit = Number(process.argv[2] ?? 300)
const { words, roots } = parseCorpus()

const wordLines = words
  .slice(0, limit)
  .map((w) =>
    [w.frequencyRank, w.lemma, w.frequency, w.pos, w.posDetail ?? '', w.verbForm ?? '', w.radicals ?? ''].join('\t')
  )

const rootLines = roots.slice(0, 200).map((r) => [r.radicals, r.occurrenceCount, r.wordCount].join('\t'))

writeFileSync(join(__dirname, 'data', `top-words.tsv`), wordLines.join('\n'), 'utf8')
writeFileSync(join(__dirname, 'data', `top-roots.tsv`), rootLines.join('\n'), 'utf8')
console.log('wrote', wordLines.length, 'words and', rootLines.length, 'roots')
