import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { Word } from '../words/entities/word.entity'
import { Pattern } from './entities/pattern.entity'
import { PatternCategory } from './enums/pattern-category.enum'

/** Families in teaching order: what the shape does, not how often it appears. */
const FAMILY_ORDER: PatternCategory[] = [
  PatternCategory.ACTIVE_PARTICIPLE,
  PatternCategory.PASSIVE_PARTICIPLE,
  PatternCategory.VERBAL_NOUN,
  PatternCategory.PLACE_OR_TIME,
  PatternCategory.INSTRUMENT,
  PatternCategory.INTENSIVE,
  PatternCategory.ADJECTIVE,
  PatternCategory.COMPARATIVE,
  PatternCategory.BROKEN_PLURAL,
  PatternCategory.VERB,
  PatternCategory.NOUN,
  PatternCategory.OTHER
]

interface FamilyRow {
  category: PatternCategory
  patternCount: string
  wordCount: string
  tokenCount: string
}

@Injectable()
export class PatternsService {
  constructor(
    @InjectRepository(Pattern) private readonly patterns: Repository<Pattern>,
    @InjectRepository(Word) private readonly words: Repository<Word>
  ) {}

  /** The eight-or-so shapes a template can carry, with their Quranic weight. */
  async listFamilies() {
    const rows: FamilyRow[] = await this.patterns
      .createQueryBuilder('pattern')
      .leftJoin(Word, 'word', 'word.pattern_id = pattern.id')
      .select('pattern.category', 'category')
      .addSelect('COUNT(DISTINCT pattern.id)', 'patternCount')
      .addSelect('COUNT(word.id)', 'wordCount')
      .addSelect('COALESCE(SUM(word.frequency), 0)', 'tokenCount')
      .where('pattern.meaning_uz IS NOT NULL')
      .groupBy('pattern.category')
      .getRawMany()

    const byCategory = new Map(rows.map((row) => [row.category, row]))
    const total = rows.reduce((sum, row) => sum + Number(row.tokenCount), 0)

    return FAMILY_ORDER.filter((category) => byCategory.has(category)).map((category) => {
      const row = byCategory.get(category)!
      const tokenCount = Number(row.tokenCount)
      return {
        category,
        patternCount: Number(row.patternCount),
        wordCount: Number(row.wordCount),
        tokenCount,
        share: total ? tokenCount / total : 0
      }
    })
  }

  /**
   * Described templates only. The rest are shapes the derivation produced but
   * nobody has explained yet, and an unexplained shape teaches nothing.
   */
  async listPatterns(category?: PatternCategory) {
    const builder = this.patterns
      .createQueryBuilder('pattern')
      .leftJoin(Word, 'word', 'word.pattern_id = pattern.id')
      .select([
        'pattern.id AS id',
        'pattern.wazn AS wazn',
        'pattern.category AS category',
        'pattern.meaning_uz AS "meaningUz"',
        'pattern.meaning_ru AS "meaningRu"',
        'pattern.meaning_en AS "meaningEn"',
        'pattern.example_word AS "exampleWord"',
        'pattern.example_meaning AS "exampleMeaning"'
      ])
      .addSelect('COUNT(word.id)', 'wordCount')
      .addSelect('COALESCE(SUM(word.frequency), 0)', 'tokenCount')
      .where('pattern.meaning_uz IS NOT NULL')
      .groupBy('pattern.id')
      .orderBy('COALESCE(SUM(word.frequency), 0)', 'DESC')

    if (category) builder.andWhere('pattern.category = :category', { category })

    const rows = await builder.getRawMany()
    return rows.map((row) => ({
      ...row,
      wordCount: Number(row.wordCount),
      tokenCount: Number(row.tokenCount)
    }))
  }

  /** One template plus the real Quranic words poured into it. */
  async getPattern(id: string) {
    const pattern = await this.patterns.findOne({ where: { id } })
    if (!pattern) throw new NotFoundException(t('common.pattern.not_found', 'Pattern not found'))

    const words = await this.words
      .createQueryBuilder('word')
      .leftJoinAndSelect('word.root', 'root')
      .where('word.pattern_id = :id', { id })
      .orderBy('word.frequency', 'DESC')
      .take(40)
      .getMany()

    // Over every word on the template, not just the page of them returned below.
    const totals = await this.words
      .createQueryBuilder('word')
      .select('COALESCE(SUM(word.frequency), 0)', 'tokenCount')
      .where('word.pattern_id = :id', { id })
      .getRawOne<{ tokenCount: string }>()

    return { ...pattern, tokenCount: Number(totals?.tokenCount ?? 0), words }
  }

  /**
   * Shows a real Quranic word and asks what its shape does. The distractors are
   * other families, so the learner is choosing between meanings rather than
   * between spellings.
   */
  async drill(category?: PatternCategory) {
    // The question needs a glossed word to show, so templates whose words are all
    // still un-glossed are skipped rather than served as an empty prompt.
    const builder = this.patterns
      .createQueryBuilder('pattern')
      .where('pattern.meaning_uz IS NOT NULL')
      .andWhere("EXISTS (SELECT 1 FROM words w WHERE w.pattern_id = pattern.id AND w.uz IS NOT NULL AND w.uz <> '')")
      .orderBy('RANDOM()')

    if (category) builder.andWhere('pattern.category = :category', { category })

    const pattern = await builder.getOne()
    if (!pattern) throw new NotFoundException(t('common.pattern.not_found', 'Pattern not found'))

    const word = await this.words
      .createQueryBuilder('word')
      .leftJoinAndSelect('word.root', 'root')
      .where('word.pattern_id = :id', { id: pattern.id })
      .andWhere('word.uz IS NOT NULL')
      .andWhere("word.uz <> ''")
      .orderBy('RANDOM()')
      .getOne()

    const distractors = await this.patterns
      .createQueryBuilder('pattern')
      .where('pattern.meaning_uz IS NOT NULL')
      .andWhere('pattern.category != :category', { category: pattern.category })
      .andWhere('pattern.word_count > 0')
      .orderBy('RANDOM()')
      .take(3)
      .getMany()

    const options = [pattern, ...distractors]
      .map((option) => ({ id: option.id, wazn: option.wazn, meaningUz: option.meaningUz }))
      .sort(() => Math.random() - 0.5)

    return {
      answerId: pattern.id,
      wazn: pattern.wazn,
      category: pattern.category,
      word: word && {
        arabic: word.arabic,
        uz: word.uz,
        radicals: word.root?.radicals ?? null,
        rootMeaningUz: word.root?.meaningUz ?? null
      },
      options
    }
  }
}
