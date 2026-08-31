import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type Card, type FSRS, Rating, State, createEmptyCard, fsrs, generatorParameters } from 'ts-fsrs'
import { DataSource, LessThanOrEqual, Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { User } from '../users/entities/user.entity'
import { Word } from '../words/entities/word.entity'
import { GlossStatus } from '../words/enums/word.enum'
import { AddDeckDto, AnswerDto } from './dto/study.dto'
import { ReviewLog } from './entities/review-log.entity'
import { UserCard } from './entities/user-card.entity'
import { UserDeck } from './entities/user-deck.entity'
import { CardState, ReviewGrade, StudyDirection } from './enums/study.enum'

const STATE_TO_FSRS: Record<CardState, State> = {
  [CardState.NEW]: State.New,
  [CardState.LEARNING]: State.Learning,
  [CardState.REVIEW]: State.Review,
  [CardState.RELEARNING]: State.Relearning
}

const FSRS_TO_STATE: Record<State, CardState> = {
  [State.New]: CardState.NEW,
  [State.Learning]: CardState.LEARNING,
  [State.Review]: CardState.REVIEW,
  [State.Relearning]: CardState.RELEARNING
}

type FsrsGrade = Rating.Again | Rating.Hard | Rating.Good | Rating.Easy

const GRADE_TO_RATING: Record<ReviewGrade, FsrsGrade> = {
  [ReviewGrade.AGAIN]: Rating.Again,
  [ReviewGrade.HARD]: Rating.Hard,
  [ReviewGrade.GOOD]: Rating.Good,
  [ReviewGrade.EASY]: Rating.Easy
}

/**
 * Once a learner reliably recognises a word, recall in the other direction is
 * worth drilling. This is the stability, in days, at which that unlocks.
 */
const PRODUCE_UNLOCK_STABILITY = 10

interface SessionCard {
  wordId: string
  direction: StudyDirection
  isNew: boolean
  dueAt: Date | null
  arabic: string
  transcription: string | null
  glosses: Record<string, string | null>
  frequency: number
  frequencyRank: number | null
  root: { radicals: string; meaning: string | null } | null
  pattern: { wazn: string; meaning: string | null; example: string | null } | null
  example: { sura: number; ayah: number; text: string; surfaceForm: string } | null
}

@Injectable()
export class StudyService {
  private readonly scheduler: FSRS

  constructor(
    @InjectRepository(UserCard) private readonly cards: Repository<UserCard>,
    @InjectRepository(ReviewLog) private readonly logs: Repository<ReviewLog>,
    @InjectRepository(UserDeck) private readonly userDecks: Repository<UserDeck>,
    @InjectRepository(Word) private readonly words: Repository<Word>,
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly dataSource: DataSource
  ) {
    this.scheduler = fsrs(generatorParameters({ enable_fuzz: true, enable_short_term: true }))
  }

  async getSession(userId: string, deckId: string | undefined, limit: number) {
    const user = await this.users.findOneOrFail({ where: { id: userId } })

    const due = await this.dueCards(userId, deckId, limit)
    const allowance = await this.remainingNewToday(userId, user)
    const newSlots = Math.max(0, Math.min(limit - due.length, allowance))
    const fresh = newSlots > 0 ? await this.newWords(userId, deckId, newSlots) : []

    const cards = [...due, ...fresh]
    const details = await this.decorate(cards, user.answerLanguages)

    return {
      cards: details,
      counts: {
        due: due.length,
        new: fresh.length,
        remainingNewToday: allowance - fresh.length
      }
    }
  }

  /** Cards whose scheduled time has arrived, oldest first. */
  private async dueCards(userId: string, deckId: string | undefined, limit: number) {
    const query = this.cards
      .createQueryBuilder('card')
      .select(['card.wordId AS "wordId"', 'card.direction AS direction', 'card.dueAt AS "dueAt"'])
      .where('card.user_id = :userId', { userId })
      .andWhere('card.suspended = false')
      .andWhere('card.due_at <= NOW()')

    if (deckId) {
      query.andWhere('EXISTS (SELECT 1 FROM deck_words dw WHERE dw.word_id = card.word_id AND dw.deck_id = :deckId)', {
        deckId
      })
    }

    const rows = await query.orderBy('card.dueAt', 'ASC').limit(limit).getRawMany<{
      wordId: string
      direction: StudyDirection
      dueAt: Date
    }>()

    return rows.map((row) => ({ ...row, isNew: false }))
  }

  /**
   * Words the learner has never seen, taken in frequency order from their decks.
   * Words without a gloss are skipped — there would be nothing to show as the answer.
   */
  private async newWords(userId: string, deckId: string | undefined, limit: number) {
    const query = this.words
      .createQueryBuilder('word')
      .select('word.id', 'wordId')
      .where('word.gloss_status != :missing', { missing: GlossStatus.MISSING })
      .andWhere('NOT EXISTS (SELECT 1 FROM user_cards uc WHERE uc.word_id = word.id AND uc.user_id = :userId)', {
        userId
      })

    if (deckId) {
      query.andWhere('EXISTS (SELECT 1 FROM deck_words dw WHERE dw.word_id = word.id AND dw.deck_id = :deckId)', {
        deckId
      })
    } else {
      query.andWhere(
        `EXISTS (
           SELECT 1 FROM deck_words dw
           JOIN user_decks ud ON ud.deck_id = dw.deck_id
           WHERE dw.word_id = word.id AND ud.user_id = :userId AND ud.is_active = true
         )`,
        { userId }
      )
    }

    const rows = await query
      .orderBy('word.frequencyRank', 'ASC', 'NULLS LAST')
      .limit(limit)
      .getRawMany<{ wordId: string }>()

    return rows.map((row) => ({
      wordId: row.wordId,
      direction: StudyDirection.RECOGNIZE,
      dueAt: null,
      isNew: true
    }))
  }

  private async remainingNewToday(userId: string, user: User) {
    const row = await this.cards
      .createQueryBuilder('card')
      .select('COUNT(*)', 'count')
      .where('card.user_id = :userId', { userId })
      .andWhere(`card.created_at >= date_trunc('day', NOW())`)
      .getRawOne<{ count: string }>()

    return Math.max(0, user.dailyNewLimit - Number(row?.count ?? 0))
  }

  /** Loads everything the card needs to render: glosses, root, template, a short example ayah. */
  private async decorate(
    cards: { wordId: string; direction: StudyDirection; dueAt: Date | null; isNew: boolean }[],
    answerLanguages: string[]
  ): Promise<SessionCard[]> {
    if (!cards.length) return []

    const rows = await this.dataSource.query<
      {
        id: string
        arabic: string
        transcription: string | null
        uz: string | null
        ru: string | null
        en: string | null
        frequency: number
        frequency_rank: number | null
        radicals: string | null
        root_meaning: string | null
        wazn: string | null
        pattern_meaning: string | null
        pattern_example: string | null
        sura: number | null
        ayah: number | null
        ayah_text: string | null
        surface_form: string | null
      }[]
    >(
      `SELECT w.id, w.arabic, w.transcription, w.uz, w.ru, w.en, w.frequency, w.frequency_rank,
              r.radicals, r.meaning_uz AS root_meaning,
              p.wazn, p.meaning_uz AS pattern_meaning, p.example_word AS pattern_example,
              e.sura, e.ayah, e.text AS ayah_text, e.surface_form
         FROM words w
         LEFT JOIN roots r ON r.id = w.root_id
         LEFT JOIN patterns p ON p.id = w.pattern_id
         LEFT JOIN LATERAL (
           SELECT o.sura, o.ayah, o.surface_form, a.text
             FROM word_occurrences o
             JOIN ayahs a ON a.sura = o.sura AND a.ayah = o.ayah
            WHERE o.word_id = w.id
            ORDER BY length(a.text) ASC
            LIMIT 1
         ) e ON TRUE
        WHERE w.id = ANY($1)`,
      [cards.map((card) => card.wordId)]
    )

    const byId = new Map(rows.map((row) => [row.id, row]))

    return cards.flatMap((card) => {
      const row = byId.get(card.wordId)
      if (!row) return []

      const allGlosses: Record<string, string | null> = { uz: row.uz, ru: row.ru, en: row.en }
      const glosses = Object.fromEntries(
        answerLanguages.filter((lang) => lang in allGlosses).map((lang) => [lang, allGlosses[lang]])
      )

      return [
        {
          wordId: card.wordId,
          direction: card.direction,
          isNew: card.isNew,
          dueAt: card.dueAt,
          arabic: row.arabic,
          transcription: row.transcription,
          glosses,
          frequency: row.frequency,
          frequencyRank: row.frequency_rank,
          root: row.radicals ? { radicals: row.radicals, meaning: row.root_meaning } : null,
          pattern: row.wazn ? { wazn: row.wazn, meaning: row.pattern_meaning, example: row.pattern_example } : null,
          example:
            row.sura && row.ayah && row.ayah_text
              ? {
                  sura: row.sura,
                  ayah: row.ayah,
                  text: row.ayah_text,
                  surfaceForm: row.surface_form ?? row.arabic
                }
              : null
        }
      ]
    })
  }

  async answer(userId: string, dto: AnswerDto) {
    const word = await this.words.findOne({ where: { id: dto.wordId }, select: ['id', 'glossStatus'] })
    if (!word) throw new NotFoundException(t('common.word.not_found', 'Word not found'))
    if (word.glossStatus === GlossStatus.MISSING) {
      throw new BadRequestException(t('common.word.no_gloss', 'This word has no gloss yet'))
    }

    const reviewedAt = new Date()

    return this.dataSource.transaction(async (manager) => {
      const cardRepo = manager.getRepository(UserCard)

      let card = await cardRepo.findOne({
        where: { userId, wordId: dto.wordId, direction: dto.direction }
      })

      const previous: Card = card ? this.toFsrsCard(card) : createEmptyCard(reviewedAt)
      const outcome = this.scheduler.next(previous, reviewedAt, GRADE_TO_RATING[dto.grade])

      card ??= cardRepo.create({ userId, wordId: dto.wordId, direction: dto.direction })
      Object.assign(card, this.fromFsrsCard(outcome.card))
      const saved = await cardRepo.save(card)

      await manager.getRepository(ReviewLog).insert({
        userCardId: saved.id,
        userId,
        grade: dto.grade,
        state: FSRS_TO_STATE[outcome.log.state],
        dueAt: outcome.log.due,
        stability: outcome.log.stability,
        difficulty: outcome.log.difficulty,
        elapsedDays: outcome.log.elapsed_days,
        lastElapsedDays: outcome.log.last_elapsed_days,
        scheduledDays: outcome.log.scheduled_days,
        durationMs: dto.durationMs
      })

      const unlocked = await this.maybeUnlockProduce(manager.getRepository(UserCard), saved, reviewedAt)

      return {
        wordId: saved.wordId,
        direction: saved.direction,
        state: saved.state,
        dueAt: saved.dueAt,
        stability: Number(saved.stability.toFixed(2)),
        difficulty: Number(saved.difficulty.toFixed(2)),
        intervalDays: Number(saved.scheduledDays.toFixed(2)),
        reps: saved.reps,
        lapses: saved.lapses,
        unlockedDirections: unlocked
      }
    })
  }

  /** Recognition first, production once the word is reliably known. */
  private async maybeUnlockProduce(repo: Repository<UserCard>, card: UserCard, now: Date) {
    if (card.direction !== StudyDirection.RECOGNIZE) return []
    if (card.state !== CardState.REVIEW || card.stability < PRODUCE_UNLOCK_STABILITY) return []

    const exists = await repo.exist({
      where: { userId: card.userId, wordId: card.wordId, direction: StudyDirection.PRODUCE }
    })
    if (exists) return []

    const fresh = createEmptyCard(now)
    await repo.insert({
      userId: card.userId,
      wordId: card.wordId,
      direction: StudyDirection.PRODUCE,
      ...this.fromFsrsCard(fresh)
    })

    return [StudyDirection.PRODUCE]
  }

  private toFsrsCard(card: UserCard): Card {
    return {
      due: card.dueAt,
      stability: card.stability,
      difficulty: card.difficulty,
      elapsed_days: card.elapsedDays,
      scheduled_days: card.scheduledDays,
      learning_steps: card.learningSteps,
      reps: card.reps,
      lapses: card.lapses,
      state: STATE_TO_FSRS[card.state],
      last_review: card.lastReviewAt
    }
  }

  private fromFsrsCard(card: Card) {
    return {
      dueAt: card.due,
      stability: card.stability,
      difficulty: card.difficulty,
      elapsedDays: card.elapsed_days,
      scheduledDays: card.scheduled_days,
      learningSteps: card.learning_steps,
      reps: card.reps,
      lapses: card.lapses,
      state: FSRS_TO_STATE[card.state],
      lastReviewAt: card.last_review
    }
  }

  /** Progress the learner actually cares about: how much of the Quran they can now read. */
  async getStats(userId: string) {
    const [states] = await Promise.all([
      this.cards
        .createQueryBuilder('card')
        .select('card.state', 'state')
        .addSelect('COUNT(*)', 'count')
        .where('card.user_id = :userId', { userId })
        .andWhere('card.direction = :direction', { direction: StudyDirection.RECOGNIZE })
        .groupBy('card.state')
        .getRawMany<{ state: CardState; count: string }>()
    ])

    const coverage = await this.dataSource.query<[{ known: string | null; total: string }]>(
      `SELECT (SELECT SUM(w.frequency)
                 FROM user_cards uc
                 JOIN words w ON w.id = uc.word_id
                WHERE uc.user_id = $1
                  AND uc.direction = $2
                  AND uc.state IN ($3, $4)) AS known,
              (SELECT SUM(frequency) FROM words WHERE source = 'QURAN') AS total`,
      [userId, StudyDirection.RECOGNIZE, CardState.REVIEW, CardState.RELEARNING]
    )

    const dueNow = await this.cards.count({
      where: { userId, suspended: false, dueAt: LessThanOrEqual(new Date()) }
    })

    const known = Number(coverage[0]?.known ?? 0)
    const total = Number(coverage[0]?.total ?? 0)

    return {
      byState: Object.fromEntries(states.map((row) => [row.state, Number(row.count)])),
      dueNow,
      quranCoverage: total > 0 ? Number(((known / total) * 100).toFixed(1)) : 0
    }
  }

  async listDecks(userId: string) {
    return this.userDecks.find({
      where: { userId, isActive: true },
      relations: ['deck'],
      order: { createdAt: 'ASC' }
    })
  }

  async addDeck(userId: string, dto: AddDeckDto, assignedBy?: string) {
    const existing = await this.userDecks.findOne({ where: { userId, deckId: dto.deckId } })

    if (existing) {
      existing.isActive = true
      if (dto.dailyNewLimit) existing.dailyNewLimit = dto.dailyNewLimit
      return this.userDecks.save(existing)
    }

    return this.userDecks.save(
      this.userDecks.create({
        userId,
        deckId: dto.deckId,
        dailyNewLimit: dto.dailyNewLimit ?? 10,
        assignedBy
      })
    )
  }

  async removeDeck(userId: string, deckId: string) {
    await this.userDecks.update({ userId, deckId }, { isActive: false })
    return { success: true }
  }

  async suspend(userId: string, wordId: string, suspended: boolean) {
    const result = await this.cards.update({ userId, wordId }, { suspended })
    if (!result.affected) throw new NotFoundException(t('common.card.not_found', 'Card not found'))
    return { success: true }
  }

  /** Cards a learner has already met, for the "my words" list. */
  async listCards(userId: string, params: { page?: number; limit?: number; state?: CardState }) {
    const { page = 1, limit = 20, state } = params
    const query = this.cards
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.word', 'word')
      .where('card.user_id = :userId', { userId })
      .andWhere('card.direction = :direction', { direction: StudyDirection.RECOGNIZE })

    if (state) query.andWhere('card.state = :state', { state })

    const [content, totalElements] = await query
      .orderBy('card.dueAt', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return { content, page: { totalElements, totalPages: Math.ceil(totalElements / limit) } }
  }
}
