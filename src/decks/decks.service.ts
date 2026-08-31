import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { Deck } from './entities/deck.entity'
import { DeckType } from './enums/deck-type.enum'

@Injectable()
export class DecksService {
  constructor(@InjectRepository(Deck) private readonly decks: Repository<Deck>) {}

  /** Public decks plus the learner's own. */
  async findAll(ownerId: string, type?: DeckType) {
    const builder = this.decks
      .createQueryBuilder('deck')
      .where('(deck.is_public = true OR deck.owner_id = :ownerId)', { ownerId })

    if (type) builder.andWhere('deck.type = :type', { type })

    return builder.orderBy('deck.type', 'ASC').addOrderBy('deck.position', 'ASC').getMany()
  }

  async findOne(id: string, ownerId: string) {
    const deck = await this.decks
      .createQueryBuilder('deck')
      .where('deck.id = :id', { id })
      .andWhere('(deck.is_public = true OR deck.owner_id = :ownerId)', { ownerId })
      .getOne()

    if (!deck) throw new NotFoundException(t('common.deck.not_found', 'Deck not found'))
    return deck
  }
}
