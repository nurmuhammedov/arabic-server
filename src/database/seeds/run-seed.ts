import { readFileSync } from 'fs'
import { join } from 'path'
import { type DataSource } from 'typeorm'

import { DeckWord } from '../../decks/entities/deck-word.entity'
import { Deck } from '../../decks/entities/deck.entity'
import { DeckType } from '../../decks/enums/deck-type.enum'
import { Particle } from '../../huruf/entities/particle.entity'
import { Attachment, GrammarEffect } from '../../huruf/enums/huruf.enum'
import { IrabExample } from '../../nahw/entities/irab-example.entity'
import { NahwTopic } from '../../nahw/entities/nahw-topic.entity'
import { Pattern } from '../../patterns/entities/pattern.entity'
import { PatternCategory } from '../../patterns/enums/pattern-category.enum'
import { Root } from '../../roots/entities/root.entity'
import { RootClass } from '../../sarf/entities/root-class.entity'
import { VerbForm } from '../../sarf/entities/verb-form.entity'
import { Ayah } from '../../words/entities/ayah.entity'
import { Word } from '../../words/entities/word.entity'
import { GlossStatus, PartOfSpeech, WordSource } from '../../words/enums/word.enum'
import { dataSource } from '../data-source'
import { classifyRoot } from './classify-roots'
import { deriveBareBabs } from './derive-bab'
import { ROOT_GLOSSES, WORD_GLOSSES } from './glossary'
import { harvestIrab } from './harvest-irab'
import { PARTICLES } from './huruf-data'
import { NAHW_TOPICS } from './nahw-data'
import { canonicalArabic, normalizeArabic, parseCorpus, waznKey } from './parse-corpus'
import { PATTERN_GLOSSES } from './pattern-glossary'
import { ROOT_CLASSES, VERB_FORMS } from './sarf-data'

const CHUNK = 1000

/** Deck tiers, chosen so each one is a visible jump in Quran coverage. */
const FREQUENCY_TIERS = [
  { size: 50, uz: 'Eng muhim 50 so‘z', ru: 'Самые важные 50 слов', en: 'Core 50' },
  { size: 100, uz: 'Eng muhim 100 so‘z', ru: 'Самые важные 100 слов', en: 'Core 100' },
  { size: 250, uz: 'Eng muhim 250 so‘z', ru: 'Самые важные 250 слов', en: 'Core 250' },
  { size: 500, uz: 'Eng muhim 500 so‘z', ru: 'Самые важные 500 слов', en: 'Core 500' },
  { size: 1000, uz: 'Eng muhim 1000 so‘z', ru: 'Самые важные 1000 слов', en: 'Core 1000' },
  { size: 2000, uz: 'Eng muhim 2000 so‘z', ru: 'Самые важные 2000 слов', en: 'Core 2000' }
]

const chunked = <T>(items: T[], size = CHUNK): T[][] => {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

const seedRoots = async (ds: DataSource, parsed: ReturnType<typeof parseCorpus>) => {
  const glosses = new Map(ROOT_GLOSSES.map(([radicals, uz, ru, en]) => [canonicalArabic(radicals), { uz, ru, en }]))
  const repo = ds.getRepository(Root)

  const rows = parsed.roots.map((root) => {
    const gloss = glosses.get(root.radicals)
    return {
      radicals: root.radicals,
      letterCount: root.letterCount,
      occurrenceCount: root.occurrenceCount,
      wordCount: root.wordCount,
      meaningUz: gloss?.uz,
      meaningRu: gloss?.ru,
      meaningEn: gloss?.en,
      classCode: classifyRoot(root.radicals) ?? undefined
    }
  })

  for (const batch of chunked(rows)) {
    await repo.upsert(batch, { conflictPaths: ['radicals'], skipUpdateIfNoValuesChanged: true })
  }

  const saved = await repo.find({ select: ['id', 'radicals'] })
  console.log(`  roots      : ${saved.length} (${glosses.size} glossed)`)
  return new Map(saved.map((root) => [root.radicals, root.id]))
}

const seedAyahs = async (ds: DataSource, parsed: ReturnType<typeof parseCorpus>) => {
  const repo = ds.getRepository(Ayah)
  await repo.clear()

  for (const batch of chunked(parsed.ayahs)) {
    await repo.insert(batch)
  }

  const suras = new Set(parsed.ayahs.map((a) => a.sura)).size
  console.log(`  ayahs      : ${parsed.ayahs.length} across ${suras} suras`)
}

const seedPatterns = async (ds: DataSource, parsed: ReturnType<typeof parseCorpus>) => {
  // Keyed by shape, not spelling, so a gloss written with sukūn still matches the
  // corpus spelling the derivation settled on.
  const isVerbGloss = (category: PatternCategory) => category === PatternCategory.VERB
  const glosses = new Map(PATTERN_GLOSSES.map((gloss) => [waznKey(gloss.wazn, isVerbGloss(gloss.category)), gloss]))
  if (glosses.size !== PATTERN_GLOSSES.length) {
    throw new Error('PATTERN_GLOSSES contains duplicate wazn keys; the later entry would silently win.')
  }
  const repo = ds.getRepository(Pattern)

  const counts = new Map<string, number>()
  const verbWazns = new Set<string>()
  for (const word of parsed.words) {
    if (!word.wazn) continue
    counts.set(word.wazn, (counts.get(word.wazn) ?? 0) + 1)
    if (word.pos === PartOfSpeech.VERB) verbWazns.add(word.wazn)
  }

  const rows = [...counts.entries()].map(([wazn, wordCount]) => {
    const gloss = glosses.get(waznKey(wazn, verbWazns.has(wazn)))
    return {
      wazn,
      wordCount,
      category: gloss?.category ?? PatternCategory.OTHER,
      meaningUz: gloss?.uz,
      meaningRu: gloss?.ru,
      meaningEn: gloss?.en,
      exampleWord: gloss?.exampleWord,
      exampleMeaning: gloss?.exampleMeaning
    }
  })

  for (const batch of chunked(rows)) {
    await repo.upsert(batch, { conflictPaths: ['wazn'], skipUpdateIfNoValuesChanged: true })
  }

  // Earlier runs can leave behind templates that the current derivation no longer
  // produces; without this the table grows on every reseed.
  const stale = await repo
    .createQueryBuilder()
    .delete()
    .where('wazn NOT IN (:...wazns)', { wazns: rows.map((row) => row.wazn) })
    .execute()

  const saved = await repo.find({ select: ['id', 'wazn'] })
  const described = rows.filter((row) => row.meaningUz).length
  const removed = stale.affected ? `, ${stale.affected} stale removed` : ''
  console.log(`  patterns   : ${saved.length} (${described} described${removed})`)
  return new Map(saved.map((pattern) => [pattern.wazn, pattern.id]))
}

const seedWords = async (
  ds: DataSource,
  parsed: ReturnType<typeof parseCorpus>,
  rootIds: Map<string, string>,
  patternIds: Map<string, string>
) => {
  const glosses = new Map(WORD_GLOSSES.map(([lemma, uz, ru, en]) => [canonicalArabic(lemma), { uz, ru, en }]))
  const repo = ds.getRepository(Word)

  // Admin review has to outlive a reseed. Glosses signed off in the app are read
  // back before the catalogue is cleared and re-applied below, otherwise every
  // run would silently undo the review queue.
  const reviewed = new Map(
    (
      await repo.find({
        where: { source: WordSource.QURAN, glossStatus: GlossStatus.VERIFIED },
        select: ['arabic', 'uz', 'ru', 'en', 'description']
      })
    ).map((word) => [word.arabic, word])
  )

  const rows = parsed.words.map((word) => {
    const gloss = glosses.get(word.lemma)
    const kept = reviewed.get(word.lemma)
    return {
      arabic: word.lemma,
      arabicPlain: word.arabicPlain,
      pos: word.pos,
      posDetail: word.posDetail,
      verbForm: word.verbForm,
      rootId: word.radicals ? rootIds.get(word.radicals) : undefined,
      patternId: word.wazn ? patternIds.get(word.wazn) : undefined,
      frequency: word.frequency,
      frequencyRank: word.frequencyRank,
      cumulativeCoverage: word.cumulativeCoverage,
      source: WordSource.QURAN,
      uz: kept?.uz ?? gloss?.uz,
      ru: kept?.ru ?? gloss?.ru,
      en: kept?.en ?? gloss?.en,
      description: kept?.description,
      glossStatus: kept ? GlossStatus.VERIFIED : gloss ? GlossStatus.DRAFT : GlossStatus.MISSING
    }
  })

  // `arabic` is not unique on its own (homographs differ by POS), so seed idempotently
  // by clearing the Quranic catalogue first. Personal words are untouched.
  //
  // Occurrences only ever describe Quranic words, so truncating is both correct and
  // far cheaper than deleting 75k indexed rows through a cascade.
  await ds.query('TRUNCATE TABLE word_occurrences')
  await repo.delete({ source: WordSource.QURAN })

  const saved: Word[] = []
  for (const batch of chunked(rows)) {
    saved.push(...(await repo.save(repo.create(batch))))
  }

  const withPattern = rows.filter((row) => row.patternId).length
  const carried = reviewed.size ? `, ${reviewed.size} verified carried over` : ''
  console.log(
    `  words      : ${saved.length} (${glosses.size} glossed, ${rows.length - glosses.size} pending, ` +
      `${withPattern} with a template${carried})`
  )
  return new Map(saved.map((word) => [word.arabic, word.id]))
}

const seedOccurrences = async (
  ds: DataSource,
  parsed: ReturnType<typeof parseCorpus>,
  wordIds: Map<string, string>
) => {
  const rows = parsed.words.flatMap((word) => {
    const wordId = wordIds.get(word.lemma)
    if (!wordId) return []
    return word.occurrences.map((occurrence) => ({ wordId, ...occurrence }))
  })

  // 75k rows through the ORM means hundreds of thousands of bind parameters and
  // takes minutes. Passing five arrays and expanding them server-side with
  // unnest keeps it to a handful of parameters per batch.
  for (const batch of chunked(rows, 10000)) {
    await ds.query(
      `INSERT INTO word_occurrences (word_id, sura, ayah, word_index, surface_form)
       SELECT * FROM unnest($1::uuid[], $2::smallint[], $3::smallint[], $4::smallint[], $5::varchar[])`,
      [
        batch.map((row) => row.wordId),
        batch.map((row) => row.sura),
        batch.map((row) => row.ayah),
        batch.map((row) => row.wordIndex),
        batch.map((row) => row.surfaceForm)
      ]
    )
  }

  console.log(`  occurrences: ${rows.length}`)
}

const seedSarf = async (ds: DataSource, parsed: ReturnType<typeof parseCorpus>) => {
  const formRepo = ds.getRepository(VerbForm)
  const classRepo = ds.getRepository(RootClass)

  // Real Quranic weight per bāb, so the curriculum can show what is worth studying.
  const byCorpusForm = new Map<number, { lemmas: number; tokens: number }>()
  for (const word of parsed.words) {
    if (word.pos !== PartOfSpeech.VERB || !word.verbForm) continue
    const entry = byCorpusForm.get(word.verbForm) ?? { lemmas: 0, tokens: 0 }
    entry.lemmas++
    entry.tokens += word.frequency
    byCorpusForm.set(word.verbForm, entry)
  }

  // The corpus tags every Form I verb the same way, so the six bare-triliteral bābs
  // are recovered by reading the middle-radical vowel off the perfect and imperfect
  // forms. Weak roots elide that radical and stay unassigned rather than guessed.
  const bareBabs = new Map<string, { lemmas: number; tokens: number }>()
  for (const assignment of deriveBareBabs()) {
    const entry = bareBabs.get(assignment.babCode) ?? { lemmas: 0, tokens: 0 }
    entry.lemmas++
    entry.tokens += assignment.tokens
    bareBabs.set(assignment.babCode, entry)
  }

  const formRows = VERB_FORMS.map((form) => {
    const stats =
      form.corpusForm === 1 ? bareBabs.get(form.code) : form.corpusForm ? byCorpusForm.get(form.corpusForm) : undefined
    return {
      ...form,
      lemmaCount: stats?.lemmas ?? 0,
      tokenCount: stats?.tokens ?? 0
    }
  })

  for (const batch of chunked(formRows)) {
    await formRepo.upsert(batch, { conflictPaths: ['code'], skipUpdateIfNoValuesChanged: true })
  }

  // Root-class weights come straight from the classifier.
  const classTotals = new Map<string, { roots: number; tokens: number }>()
  for (const root of parsed.roots) {
    const code = classifyRoot(root.radicals)
    if (!code) continue
    const entry = classTotals.get(code) ?? { roots: 0, tokens: 0 }
    entry.roots++
    entry.tokens += root.occurrenceCount
    classTotals.set(code, entry)
  }

  const classRows = ROOT_CLASSES.map((rootClass) => {
    const totals = classTotals.get(rootClass.code)
    return { ...rootClass, rootCount: totals?.roots ?? 0, tokenCount: totals?.tokens ?? 0 }
  })

  await classRepo.upsert(classRows, { conflictPaths: ['code'], skipUpdateIfNoValuesChanged: true })

  const unclassified = parsed.roots.filter((root) => !classifyRoot(root.radicals)).length
  console.log(`  verb forms : ${formRows.length} abwab`)
  console.log(`  root classes: ${classRows.length} (${unclassified} non-triliteral roots left unclassified)`)
  for (const row of classRows) {
    console.log(
      `     ${row.nameAr.padEnd(12)} ${String(row.rootCount).padStart(4)} roots  ${String(row.tokenCount).padStart(6)} tokens`
    )
  }
}

const seedHuruf = async (ds: DataSource) => {
  const repo = ds.getRepository(Particle)

  // Counts have to come from the raw segments: attached forms such as و, ال and بِ
  // never appear as standalone lemmas, so the word table cannot see them at all.
  //
  // The tallies are kept apart by attachment because single letters collide badly
  // otherwise — the prefix كَ "like" and the suffix ـكَ "your" both reduce to ك.
  const raw = readFileSync(join(__dirname, 'data', 'quran-morphology.txt'), 'utf8')
  const standaloneLemmas = new Map<string, number>()
  const prefixLemmas = new Map<string, number>()
  const suffixForms = new Map<string, number>()

  const bump = (store: Map<string, number>, key: string) => store.set(key, (store.get(key) ?? 0) + 1)

  for (const line of raw.split('\n')) {
    const parts = line.split('\t')
    if (parts.length < 4) continue

    const features = parts[3].split('|')
    const isPrefix = features.includes('PREF')
    const isSuffix = features.includes('SUFF')
    const lemma = features.find((f) => f.startsWith('LEM:'))?.slice(4)

    if (isSuffix) {
      bump(suffixForms, normalizeArabic(canonicalArabic(parts[1])))
    } else if (isPrefix) {
      if (lemma) bump(prefixLemmas, canonicalArabic(lemma))
    } else if (lemma) {
      bump(standaloneLemmas, canonicalArabic(lemma))
    }
  }

  const rows = PARTICLES.map((particle, index) => {
    const arabic = canonicalArabic(particle.arabic)
    const plain = normalizeArabic(arabic)
    const attachment = particle.attachment ?? Attachment.STANDALONE
    const corpusKey = canonicalArabic(particle.corpusLemma ?? particle.arabic)

    const frequency =
      attachment === Attachment.SUFFIX
        ? (suffixForms.get(plain) ?? 0)
        : attachment === Attachment.PREFIX
          ? (prefixLemmas.get(corpusKey) ?? prefixLemmas.get(normalizeArabic(corpusKey)) ?? 0)
          : (standaloneLemmas.get(corpusKey) ?? standaloneLemmas.get(normalizeArabic(corpusKey)) ?? 0)

    return {
      ...particle,
      arabic,
      arabicPlain: plain,
      attachment,
      grammarEffect: particle.grammarEffect ?? GrammarEffect.NONE,
      frequency,
      position: index
    }
  })

  for (const batch of chunked(rows)) {
    await repo.upsert(batch, { conflictPaths: ['arabic'], skipUpdateIfNoValuesChanged: true })
  }

  const covered = rows.reduce((sum, row) => sum + row.frequency, 0)
  const missing = rows.filter((row) => row.frequency === 0).map((row) => row.arabic)
  console.log(`  particles  : ${rows.length} function words, ${covered} tokens covered`)
  if (missing.length) console.log(`     no corpus match for: ${missing.join(' ')}`)
}

const seedNahw = async (ds: DataSource) => {
  const topicRepo = ds.getRepository(NahwTopic)
  const exampleRepo = ds.getRepository(IrabExample)

  await topicRepo.upsert([...NAHW_TOPICS], { conflictPaths: ['slug'], skipUpdateIfNoValuesChanged: true })

  // Rebuilt from scratch: the harvester is heuristic, so a rerun should replace
  // its output rather than accumulate stale rows alongside corrected ones.
  await exampleRepo.clear()

  const harvested = harvestIrab()
  for (const batch of chunked(harvested, 10000)) {
    await ds.query(
      `INSERT INTO irab_examples (sura, ayah, word_index, surface_form, irab_case, cause, trigger_form, ayah_words)
       SELECT * FROM unnest($1::smallint[], $2::smallint[], $3::smallint[], $4::varchar[],
                            $5::irab_examples_irab_case_enum[], $6::irab_examples_cause_enum[],
                            $7::varchar[], $8::smallint[])`,
      [
        batch.map((row) => row.sura),
        batch.map((row) => row.ayah),
        batch.map((row) => row.wordIndex),
        batch.map((row) => row.surfaceForm),
        batch.map((row) => row.irabCase),
        batch.map((row) => row.cause),
        batch.map((row) => row.triggerForm ?? null),
        batch.map((row) => row.ayahWords)
      ]
    )
  }

  const byCause = new Map<string, number>()
  for (const item of harvested) byCause.set(item.cause, (byCause.get(item.cause) ?? 0) + 1)

  console.log(`  nahw topics: ${NAHW_TOPICS.length} lessons`)
  console.log(`  irab drills: ${harvested.length} words with an identifiable cause`)
  for (const [cause, count] of [...byCause.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`     ${cause.padEnd(12)} ${String(count).padStart(6)}`)
  }
}

const seedFrequencyDecks = async (
  ds: DataSource,
  parsed: ReturnType<typeof parseCorpus>,
  wordIds: Map<string, string>
) => {
  const deckRepo = ds.getRepository(Deck)
  const deckWordRepo = ds.getRepository(DeckWord)

  await deckRepo.delete({ type: DeckType.FREQUENCY })

  for (const [index, tier] of FREQUENCY_TIERS.entries()) {
    const slice = parsed.words.slice(0, tier.size)
    if (!slice.length) continue

    const coverage = slice[slice.length - 1].cumulativeCoverage
    const deck = await deckRepo.save(
      deckRepo.create({
        titleUz: tier.uz,
        titleRu: tier.ru,
        titleEn: tier.en,
        description: `Qur’on matnining ${(coverage * 100).toFixed(0)}% so‘zini qoplaydi.`,
        type: DeckType.FREQUENCY,
        position: index,
        isPublic: true,
        wordCount: slice.length,
        coverage
      })
    )

    const links = slice
      .map((word, position) => ({ deckId: deck.id, wordId: wordIds.get(word.lemma)!, position }))
      .filter((link) => link.wordId)

    for (const batch of chunked(links)) {
      await deckWordRepo.insert(batch)
    }

    console.log(`  deck       : ${tier.uz.padEnd(24)} ${links.length} words, ${(coverage * 100).toFixed(1)}% coverage`)
  }
}

const run = async () => {
  console.log('Parsing the Quranic Arabic Corpus…')
  const parsed = parseCorpus()
  console.log(
    `  ${parsed.words.length} lemmas, ${parsed.roots.length} roots, ` +
      `${parsed.ayahs.length} ayahs, ${parsed.totalTokens} tokens\n`
  )

  const ds = await dataSource.initialize()
  const started = Date.now()
  const step = (label: string) => console.log(`  ${label} — ${((Date.now() - started) / 1000).toFixed(0)}s elapsed`)

  try {
    console.log('Seeding…')
    await seedAyahs(ds, parsed)
    step('ayahs done')
    const rootIds = await seedRoots(ds, parsed)
    step('roots done')
    const patternIds = await seedPatterns(ds, parsed)
    step('patterns done')
    const wordIds = await seedWords(ds, parsed, rootIds, patternIds)
    step('words done')
    await seedOccurrences(ds, parsed, wordIds)
    step('occurrences done')
    await seedSarf(ds, parsed)
    step('sarf done')
    await seedHuruf(ds)
    step('huruf done')
    await seedNahw(ds)
    step('nahw done')
    await seedFrequencyDecks(ds, parsed, wordIds)
    step('decks done')
    console.log('\nDone.')
  } finally {
    await ds.destroy()
  }
}

run().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
