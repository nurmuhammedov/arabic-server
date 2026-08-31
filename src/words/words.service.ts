import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'

import { RoleEnum } from '../common/enums/role.enum'
import { canonicalArabic, normalizeArabic } from '../common/helpers/arabic.helper'
import { t } from '../common/helpers/i18n.helper'
import { JwtPayload } from '../types/jwt-payload.type'
import { CreateWordDto } from './dto/create-word.dto'
import { UpdateWordDto } from './dto/update-word.dto'
import { WordOccurrence } from './entities/word-occurrence.entity'
import { Word } from './entities/word.entity'
import { GlossStatus, WordSource } from './enums/word.enum'

export interface WordQuery {
  page?: number
  limit?: number
  search?: string
  rootId?: string
  patternId?: string
  deckId?: string
  glossStatus?: GlossStatus
  source?: WordSource
  ownerId?: string
}

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private readonly words: Repository<Word>,
    @InjectRepository(WordOccurrence) private readonly occurrences: Repository<WordOccurrence>
  ) {}

  async findAll(query: WordQuery) {
    const { page = 1, limit = 20, search, rootId, patternId, deckId, glossStatus, source, ownerId } = query

    const builder = this.words
      .createQueryBuilder('word')
      .leftJoin('word.root', 'root')
      .leftJoin('word.pattern', 'pattern')
      .addSelect(['root.id', 'root.radicals', 'root.meaningUz'])
      .addSelect(['pattern.id', 'pattern.wazn', 'pattern.meaningUz'])

    // A learner sees the shared Quranic catalogue plus their own private words.
    if (ownerId) {
      builder.andWhere('(word.owner_id IS NULL OR word.owner_id = :ownerId)', { ownerId })
    }

    if (search) {
      // The virtual keyboard emits shadda before the vowel and adds harakat the
      // stored rows may not carry, so the term is matched twice: canonicalised
      // against the vowelled column and stripped against the plain one.
      const term = `%${canonicalArabic(search.trim())}%`
      const plain = `%${normalizeArabic(search)}%`
      builder.andWhere(
        '(word.arabic ILIKE :term OR word.arabic_plain ILIKE :plain OR word.uz ILIKE :term OR word.ru ILIKE :term OR word.en ILIKE :term OR word.transcription ILIKE :term)',
        { term, plain }
      )
    }
    if (rootId) builder.andWhere('word.root_id = :rootId', { rootId })
    if (patternId) builder.andWhere('word.pattern_id = :patternId', { patternId })
    if (glossStatus) builder.andWhere('word.gloss_status = :glossStatus', { glossStatus })
    if (source) builder.andWhere('word.source = :source', { source })
    if (deckId) {
      builder.andWhere('EXISTS (SELECT 1 FROM deck_words dw WHERE dw.word_id = word.id AND dw.deck_id = :deckId)', {
        deckId
      })
    }

    const [content, totalElements] = await builder
      .orderBy('word.frequencyRank', 'ASC', 'NULLS LAST')
      .addOrderBy('word.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return { content, page: { totalElements, totalPages: Math.ceil(totalElements / limit) } }
  }

  async findOne(id: string, ownerId?: string) {
    const builder = this.words
      .createQueryBuilder('word')
      .leftJoinAndSelect('word.root', 'root')
      .leftJoinAndSelect('word.pattern', 'pattern')
      .leftJoinAndSelect('word.images', 'images')
      .where('word.id = :id', { id })

    if (ownerId) builder.andWhere('(word.owner_id IS NULL OR word.owner_id = :ownerId)', { ownerId })

    const word = await builder.getOne()
    if (!word) throw new NotFoundException(t('common.word.not_found', 'Word not found'))

    // A word can appear several times in one verse; list each verse once.
    const occurrences = await this.occurrences.query(
      `SELECT DISTINCT ON (o.sura, o.ayah)
              o.sura, o.ayah, o.word_index AS "wordIndex", o.surface_form AS "surfaceForm", a.text
         FROM word_occurrences o
         JOIN ayahs a ON a.sura = o.sura AND a.ayah = o.ayah
        WHERE o.word_id = $1
        ORDER BY o.sura, o.ayah, o.word_index
        LIMIT 20`,
      [id]
    )

    // Sibling words on the same root — the point of root-based learning.
    const family = word.rootId
      ? await this.words.find({
          where: { rootId: word.rootId },
          select: ['id', 'arabic', 'transcription', 'uz', 'ru', 'en', 'frequency', 'patternId'],
          order: { frequency: 'DESC' },
          take: 25
        })
      : []

    return { ...word, occurrences, family: family.filter((sibling) => sibling.id !== word.id) }
  }

  /** Shared catalogue entries carry no owner; a student's own words carry theirs. */
  async create(dto: CreateWordDto, user: JwtPayload) {
    const isAdmin = user.role === RoleEnum.ADMIN
    const arabic = canonicalArabic(dto.arabic.trim())
    const arabicPlain = normalizeArabic(arabic)

    const clash = await this.words.findOne({
      where: { arabic, ownerId: isAdmin ? IsNull() : user.id },
      select: ['id']
    })
    if (clash) throw new ConflictException(t('common.word.exists', 'This word is already in the dictionary'))

    const word = this.words.create({
      ...dto,
      arabic,
      arabicPlain,
      source: WordSource.PERSONAL,
      ownerId: isAdmin ? undefined : user.id,
      glossStatus: this.glossStatusFor(dto, isAdmin)
    })

    return this.words.save(word)
  }

  async update(id: string, dto: UpdateWordDto, user: JwtPayload) {
    const word = await this.ownedWord(id, user)

    if (dto.arabic !== undefined) {
      if (word.source === WordSource.QURAN) {
        throw new ForbiddenException(
          t('common.word.quran_locked', 'Quranic forms come from the corpus and cannot be edited')
        )
      }
      word.arabic = canonicalArabic(dto.arabic.trim())
      word.arabicPlain = normalizeArabic(word.arabic)
    }

    const { arabic: _arabic, glossStatus, ...rest } = dto
    Object.assign(word, rest)
    if (glossStatus && user.role === RoleEnum.ADMIN) word.glossStatus = glossStatus
    else if (word.glossStatus === GlossStatus.MISSING && (word.uz || word.ru || word.en)) {
      word.glossStatus = GlossStatus.DRAFT
    }

    return this.words.save(word)
  }

  /** Promotes a reviewed gloss. Verified rows survive a reseed; drafts do not. */
  async verify(id: string) {
    const word = await this.words.findOne({ where: { id } })
    if (!word) throw new NotFoundException(t('common.word.not_found', 'Word not found'))
    if (!word.uz) throw new ConflictException(t('common.word.needs_uz', 'An Uzbek gloss is required before verifying'))

    word.glossStatus = GlossStatus.VERIFIED
    return this.words.save(word)
  }

  async remove(id: string, user: JwtPayload) {
    const word = await this.ownedWord(id, user)
    if (word.source === WordSource.QURAN) {
      throw new ForbiddenException(
        t('common.word.quran_locked', 'Quranic words belong to the corpus and cannot be deleted')
      )
    }

    await this.words.remove(word)
    return { id }
  }

  private glossStatusFor(dto: CreateWordDto, isAdmin: boolean) {
    if (isAdmin && dto.glossStatus) return dto.glossStatus
    return dto.uz || dto.ru || dto.en ? GlossStatus.DRAFT : GlossStatus.MISSING
  }

  /** Admins reach the whole catalogue; a student only ever reaches their own rows. */
  private async ownedWord(id: string, user: JwtPayload) {
    const word = await this.words.findOne({ where: { id } })
    if (!word) throw new NotFoundException(t('common.word.not_found', 'Word not found'))

    if (user.role !== RoleEnum.ADMIN && word.ownerId !== user.id) {
      throw new ForbiddenException(t('common.word.not_yours', 'This word is not yours'))
    }

    return word
  }
}
