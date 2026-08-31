import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { Attachment, GrammarEffect, ParticleCategory } from '../enums/huruf.enum'

/**
 * A function word — preposition, particle, pronoun, demonstrative or relative.
 *
 * These carry no root, so ṣarf never reaches them, yet they account for well
 * over half the segments in the Quran. They are also where the grammar lives:
 * knowing that إِنَّ puts the next noun in the accusative is most of what naḥw
 * gives a reader in practice.
 */
@Entity({ name: 'particles' })
@Index(['category', 'position'])
export class Particle extends BaseEntity {
  @ApiProperty({ example: 'مِن' })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 48 })
  arabic!: string

  @ApiProperty({ example: 'من', description: 'Diacritic-stripped form, for search' })
  @Index()
  @Column({ name: 'arabic_plain', type: 'varchar', length: 48 })
  arabicPlain!: string

  @ApiPropertyOptional({ example: 'min' })
  @Column({ type: 'varchar', length: 48, nullable: true })
  transliteration?: string

  @ApiProperty({ enum: ParticleCategory })
  @Column({ type: 'enum', enum: ParticleCategory })
  category!: ParticleCategory

  @ApiProperty({ enum: Attachment })
  @Column({ type: 'enum', enum: Attachment, default: Attachment.STANDALONE })
  attachment!: Attachment

  @ApiProperty({ enum: GrammarEffect, description: 'The case or mood it forces on what follows' })
  @Column({ name: 'grammar_effect', type: 'enum', enum: GrammarEffect, default: GrammarEffect.NONE })
  grammarEffect!: GrammarEffect

  @ApiProperty({ description: 'Plain-language explanation with worked examples' })
  @Column({ name: 'meaning_uz', type: 'text' })
  meaningUz!: string

  @ApiPropertyOptional()
  @Column({ name: 'meaning_ru', type: 'text', nullable: true })
  meaningRu?: string

  @ApiPropertyOptional()
  @Column({ name: 'meaning_en', type: 'text', nullable: true })
  meaningEn?: string

  @ApiPropertyOptional({ description: 'Short gloss for a flashcard front/back' })
  @Column({ name: 'short_uz', type: 'varchar', length: 160, nullable: true })
  shortUz?: string

  @ApiPropertyOptional({ description: 'What it does to the next word, in plain words' })
  @Column({ name: 'effect_note_uz', type: 'text', nullable: true })
  effectNoteUz?: string

  @ApiPropertyOptional({ example: 2 })
  @Column({ name: 'example_sura', type: 'smallint', nullable: true })
  exampleSura?: number

  @ApiPropertyOptional({ example: 255 })
  @Column({ name: 'example_ayah', type: 'smallint', nullable: true })
  exampleAyah?: number

  @ApiPropertyOptional({ description: 'What to notice in the example verse' })
  @Column({ name: 'example_note_uz', type: 'text', nullable: true })
  exampleNoteUz?: string

  @ApiProperty({ description: 'Occurrences in the Quran, counting attached forms' })
  @Index()
  @Column({ type: 'integer', default: 0 })
  frequency!: number

  @ApiProperty({ description: 'Ordering inside the curriculum' })
  @Column({ type: 'smallint', default: 0 })
  position!: number
}
