import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index, OneToMany } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { DeckType } from '../enums/deck-type.enum'
import type { DeckWord } from './deck-word.entity'

@Entity({ name: 'decks' })
@Index(['type', 'position'])
export class Deck extends BaseEntity {
  @ApiProperty({ example: 'Eng ko‘p uchraydigan 100 so‘z' })
  @Column({ name: 'title_uz', type: 'varchar', length: 160 })
  titleUz!: string

  @ApiPropertyOptional()
  @Column({ name: 'title_ru', type: 'varchar', length: 160, nullable: true })
  titleRu?: string

  @ApiPropertyOptional()
  @Column({ name: 'title_en', type: 'varchar', length: 160, nullable: true })
  titleEn?: string

  @ApiPropertyOptional()
  @Column({ type: 'text', nullable: true })
  description?: string

  @ApiProperty({ enum: DeckType })
  @Column({ type: 'enum', enum: DeckType })
  type!: DeckType

  @ApiProperty({ description: 'Ordering within the same deck type' })
  @Column({ type: 'smallint', default: 0 })
  position!: number

  @ApiProperty({ description: 'Public decks are visible to every student' })
  @Column({ name: 'is_public', type: 'boolean', default: true })
  isPublic!: boolean

  @ApiPropertyOptional({ description: 'Set for student-authored decks' })
  @Index()
  @Column({ name: 'owner_id', type: 'uuid', nullable: true })
  ownerId?: string

  @ApiProperty()
  @Column({ name: 'word_count', type: 'integer', default: 0 })
  wordCount!: number

  @ApiPropertyOptional({ description: 'Quran coverage this deck unlocks, 0..1' })
  @Column({ type: 'real', nullable: true })
  coverage?: number

  @OneToMany('DeckWord', (deckWord: DeckWord) => deckWord.deck)
  words?: DeckWord[]
}
