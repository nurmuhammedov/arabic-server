import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { PatternCategory } from '../enums/pattern-category.enum'

/**
 * A morphological template (وزن). Arabic words are a root poured into a pattern,
 * and the pattern is what predicts the meaning shift: مَفْعَل is almost always a
 * place, فاعِل almost always the one doing the action. Teaching the pattern is
 * what lets a learner guess a word they have never seen.
 */
@Entity({ name: 'patterns' })
export class Pattern extends BaseEntity {
  @ApiProperty({ example: 'مَفْعُول', description: 'The template written on the model root ف-ع-ل' })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 64 })
  wazn!: string

  @ApiProperty({ enum: PatternCategory })
  @Column({ type: 'enum', enum: PatternCategory, default: PatternCategory.OTHER })
  category!: PatternCategory

  @ApiPropertyOptional({ example: 'Ish bajarilgan narsa: “yozilgan”' })
  @Column({ name: 'meaning_uz', type: 'varchar', length: 255, nullable: true })
  meaningUz?: string

  @ApiPropertyOptional()
  @Column({ name: 'meaning_ru', type: 'varchar', length: 255, nullable: true })
  meaningRu?: string

  @ApiPropertyOptional()
  @Column({ name: 'meaning_en', type: 'varchar', length: 255, nullable: true })
  meaningEn?: string

  @ApiPropertyOptional({ example: 'مَكْتُوب', description: 'Model word built on ك-ت-ب' })
  @Column({ name: 'example_word', type: 'varchar', length: 96, nullable: true })
  exampleWord?: string

  @ApiPropertyOptional({ example: 'yozilgan' })
  @Column({ name: 'example_meaning', type: 'varchar', length: 255, nullable: true })
  exampleMeaning?: string

  @ApiProperty({ description: 'How many Quranic lemmas use this template' })
  @Index()
  @Column({ name: 'word_count', type: 'integer', default: 0 })
  wordCount!: number
}
