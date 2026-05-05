import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { CreateVocabularyDto } from './dto/create-vocabulary.dto'
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto'
import { Vocabulary } from './entities/vocabulary.entity'

@Injectable()
export class VocabularyService {
  constructor(
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>
  ) {}

  async findAll(params: {
    page?: number
    limit?: number
    search?: string
    createdBy: string
    status?: string
    arabic?: string
    uzbek?: string
    russian?: string
    english?: string
  }) {
    const { page = 1, limit = 20, search, createdBy, status, arabic, uzbek, russian, english } = params
    const query = this.vocabularyRepository
      .createQueryBuilder('vocabulary')
      .leftJoinAndSelect('vocabulary.images', 'images')
      .leftJoinAndSelect('vocabulary.files', 'files')
      .where('vocabulary.createdBy = :createdBy', { createdBy })

    // Global search
    if (search) {
      query.andWhere(
        '(vocabulary.arabic ILIKE :search OR vocabulary.uzbek ILIKE :search OR vocabulary.russian ILIKE :search OR vocabulary.english ILIKE :search)',
        {
          search: `%${search}%`
        }
      )
    }

    // Specific column filters
    if (arabic) {
      query.andWhere('vocabulary.arabic ILIKE :arabic', { arabic: `%${arabic}%` })
    }
    if (uzbek) {
      query.andWhere('vocabulary.uzbek ILIKE :uzbek', { uzbek: `%${uzbek}%` })
    }
    if (russian) {
      query.andWhere('vocabulary.russian ILIKE :russian', { russian: `%${russian}%` })
    }
    if (english) {
      query.andWhere('vocabulary.english ILIKE :english', { english: `%${english}%` })
    }
    if (status) {
      query.andWhere('vocabulary.status = :status', { status })
    }

    const [content, totalElements] = await query
      .orderBy('vocabulary.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return {
      content,
      page: {
        totalElements,
        totalPages: Math.ceil(totalElements / limit)
      }
    }
  }

  async findOne(id: string, createdBy: string) {
    const vocabulary = await this.vocabularyRepository.findOne({
      where: { id, createdBy },
      relations: ['images', 'files']
    })

    if (!vocabulary) throw new NotFoundException(t('common.vocabulary.not_found', 'Vocabulary item not found'))
    return vocabulary
  }

  async create(dto: CreateVocabularyDto, createdBy: string) {
    const { fileIds, imageIds, ...data } = dto
    const vocabulary = this.vocabularyRepository.create({
      ...data,
      createdBy
    })

    if (fileIds?.length) {
      vocabulary.files = fileIds.map((id) => ({ id }) as any)
    }

    if (imageIds?.length) {
      vocabulary.images = imageIds.map((id) => ({ id }) as any)
    }

    return this.vocabularyRepository.save(vocabulary)
  }

  async update(id: string, dto: UpdateVocabularyDto, createdBy: string) {
    const vocabulary = await this.findOne(id, createdBy)
    const { fileIds, imageIds, ...data } = dto

    Object.assign(vocabulary, data)
    vocabulary.updatedBy = createdBy

    if (fileIds) {
      vocabulary.files = fileIds.map((id) => ({ id }) as any)
    }

    if (imageIds) {
      vocabulary.images = imageIds.map((id) => ({ id }) as any)
    }

    return this.vocabularyRepository.save(vocabulary)
  }

  async remove(id: string, createdBy: string) {
    const vocabulary = await this.findOne(id, createdBy)
    await this.vocabularyRepository.remove(vocabulary)
    return { success: true }
  }
}
