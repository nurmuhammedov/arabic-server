import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { Root } from '../roots/entities/root.entity'
import { Word } from '../words/entities/word.entity'
import { RootClass } from './entities/root-class.entity'
import { VerbForm } from './entities/verb-form.entity'
import { RootClassCode } from './enums/sarf.enum'

@Injectable()
export class SarfService {
  constructor(
    @InjectRepository(VerbForm) private readonly forms: Repository<VerbForm>,
    @InjectRepository(RootClass) private readonly classes: Repository<RootClass>,
    @InjectRepository(Root) private readonly roots: Repository<Root>,
    @InjectRepository(Word) private readonly words: Repository<Word>,
    private readonly dataSource: DataSource
  ) {}

  listForms() {
    return this.forms.find({ order: { position: 'ASC' } })
  }

  async getForm(code: string) {
    const form = await this.forms.findOne({ where: { code } })
    if (!form) throw new NotFoundException(t('common.verb_form.not_found', 'Verb form not found'))

    // Real Quranic verbs built on this bāb, so the rule is never taught in the abstract.
    const examples = form.corpusForm
      ? await this.words
          .createQueryBuilder('word')
          .leftJoin('word.root', 'root')
          .addSelect(['root.radicals', 'root.meaningUz'])
          .where('word.verb_form = :corpusForm', { corpusForm: form.corpusForm })
          .andWhere('word.uz IS NOT NULL')
          .orderBy('word.frequency', 'DESC')
          .limit(12)
          .getMany()
      : []

    return { ...form, examples }
  }

  listClasses() {
    return this.classes.find({ order: { position: 'ASC' } })
  }

  async getClass(code: RootClassCode) {
    const rootClass = await this.classes.findOne({ where: { code } })
    if (!rootClass) throw new NotFoundException(t('common.root_class.not_found', 'Root class not found'))

    const roots = await this.roots.find({
      where: { classCode: code },
      order: { occurrenceCount: 'DESC' },
      take: 20
    })

    return { ...rootClass, roots }
  }

  /**
   * A derivation challenge: a word the learner has not met, whose root and
   * template they have both already seen. This is the exercise that turns
   * root plus pattern knowledge into the ability to read unfamiliar words.
   */
  async getDerivation(userId: string) {
    const rows = await this.dataSource.query<
      {
        id: string
        arabic: string
        uz: string | null
        ru: string | null
        en: string | null
        radicals: string
        root_meaning: string | null
        wazn: string
        pattern_meaning: string | null
        frequency: number
      }[]
    >(
      `WITH known_roots AS (
         SELECT DISTINCT w.root_id
           FROM user_cards uc
           JOIN words w ON w.id = uc.word_id
          WHERE uc.user_id = $1 AND uc.state IN ('REVIEW', 'RELEARNING') AND w.root_id IS NOT NULL
       ),
       known_patterns AS (
         SELECT DISTINCT w.pattern_id
           FROM user_cards uc
           JOIN words w ON w.id = uc.word_id
          WHERE uc.user_id = $1 AND uc.state IN ('REVIEW', 'RELEARNING') AND w.pattern_id IS NOT NULL
       )
       SELECT w.id, w.arabic, w.uz, w.ru, w.en, w.frequency,
              r.radicals, r.meaning_uz AS root_meaning,
              p.wazn, p.meaning_uz AS pattern_meaning
         FROM words w
         JOIN roots r ON r.id = w.root_id
         JOIN patterns p ON p.id = w.pattern_id
        WHERE w.root_id IN (SELECT root_id FROM known_roots)
          AND w.pattern_id IN (SELECT pattern_id FROM known_patterns)
          AND w.gloss_status <> 'MISSING'
          AND p.meaning_uz IS NOT NULL
          AND NOT EXISTS (SELECT 1 FROM user_cards uc WHERE uc.word_id = w.id AND uc.user_id = $1)
        ORDER BY w.frequency DESC
        LIMIT 10`,
      [userId]
    )

    if (!rows.length) return { available: false, challenge: null, distractors: [] }

    const target = rows[Math.floor(Math.random() * rows.length)]

    // Plausible wrong answers: glosses of other words the learner has not met.
    const distractors = await this.dataSource.query<{ uz: string }[]>(
      `SELECT uz FROM words
        WHERE uz IS NOT NULL AND id <> $1 AND gloss_status <> 'MISSING'
        ORDER BY random() LIMIT 3`,
      [target.id]
    )

    return {
      available: true,
      challenge: {
        wordId: target.id,
        arabic: target.arabic,
        frequency: target.frequency,
        root: { radicals: target.radicals, meaning: target.root_meaning },
        pattern: { wazn: target.wazn, meaning: target.pattern_meaning },
        answer: { uz: target.uz, ru: target.ru, en: target.en }
      },
      distractors: distractors.map((row) => row.uz)
    }
  }

  /** Where the learner stands in the ṣarf curriculum. */
  async getProgress(userId: string) {
    const rows = await this.dataSource.query<{ corpus_form: number; known: string; total: string }[]>(
      `SELECT w.verb_form AS corpus_form,
              COUNT(*) FILTER (WHERE uc.state IN ('REVIEW', 'RELEARNING')) AS known,
              COUNT(*) AS total
         FROM words w
         LEFT JOIN user_cards uc ON uc.word_id = w.id AND uc.user_id = $1
        WHERE w.verb_form IS NOT NULL
        GROUP BY w.verb_form
        ORDER BY w.verb_form`,
      [userId]
    )

    return rows.map((row) => ({
      corpusForm: Number(row.corpus_form),
      known: Number(row.known),
      total: Number(row.total)
    }))
  }
}
