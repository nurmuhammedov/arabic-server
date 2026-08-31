import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { normalizeArabic } from '../common/helpers/arabic.helper'
import { t } from '../common/helpers/i18n.helper'
import { Word } from '../words/entities/word.entity'
import { Root } from './entities/root.entity'

@Injectable()
export class RootsService {
  constructor(
    @InjectRepository(Root) private readonly roots: Repository<Root>,
    @InjectRepository(Word) private readonly words: Repository<Word>
  ) {}

  async findAll(params: { page?: number; limit?: number; search?: string; onlyGlossed?: boolean }) {
    const { page = 1, limit = 20, search, onlyGlossed } = params
    const builder = this.roots.createQueryBuilder('root')

    if (search) {
      // Radicals are stored bare, so a term typed with harakat has to be stripped
      // before it can match them.
      const term = `%${search.trim()}%`
      const plain = `%${normalizeArabic(search)}%`
      builder.andWhere('(root.radicals ILIKE :plain OR root.meaning_uz ILIKE :term OR root.meaning_en ILIKE :term)', {
        term,
        plain
      })
    }
    if (onlyGlossed) builder.andWhere('root.meaning_uz IS NOT NULL')

    const [content, totalElements] = await builder
      .orderBy('root.occurrenceCount', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return { content, page: { totalElements, totalPages: Math.ceil(totalElements / limit) } }
  }

  async findOne(id: string) {
    const root = await this.roots.findOne({ where: { id } })
    if (!root) throw new NotFoundException(t('common.root.not_found', 'Root not found'))

    const words = await this.words
      .createQueryBuilder('word')
      .leftJoin('word.pattern', 'pattern')
      .addSelect(['pattern.id', 'pattern.wazn', 'pattern.meaningUz', 'pattern.category'])
      .where('word.root_id = :id', { id })
      .orderBy('word.frequency', 'DESC')
      .getMany()

    return { ...root, words }
  }
}
