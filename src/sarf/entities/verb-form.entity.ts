import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { FormCategory } from '../enums/sarf.enum'

/**
 * One of the 22 abwāb (أبواب) — the verb templates the classical ṣarf
 * curriculum is built around. Knowing a verb's bāb is what lets a learner
 * conjugate it and, for the augmented forms, predict how the meaning shifts.
 */
@Entity({ name: 'verb_forms' })
@Index(['category', 'position'])
export class VerbForm extends BaseEntity {
  @ApiProperty({ example: 'IV', description: 'Western form number, or a bare-triliteral bāb key' })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 16 })
  code!: string

  @ApiProperty({ enum: FormCategory })
  @Column({ type: 'enum', enum: FormCategory })
  category!: FormCategory

  @ApiProperty({ description: 'Ordering inside the curriculum' })
  @Column({ type: 'smallint' })
  position!: number

  @ApiPropertyOptional({
    description: 'Corpus verb-form number, 1-10; null for bābs the Quran does not distinguish'
  })
  @Column({ name: 'corpus_form', type: 'smallint', nullable: true })
  corpusForm?: number

  @ApiProperty({ example: 'أَفْعَلَ' })
  @Column({ name: 'past_pattern', type: 'varchar', length: 48 })
  pastPattern!: string

  @ApiProperty({ example: 'يُفْعِلُ' })
  @Column({ name: 'present_pattern', type: 'varchar', length: 48 })
  presentPattern!: string

  @ApiPropertyOptional({ example: 'إِفْعال' })
  @Column({ name: 'masdar_pattern', type: 'varchar', length: 48, nullable: true })
  masdarPattern?: string

  @ApiPropertyOptional({ example: 'مُفْعِل' })
  @Column({ name: 'active_participle_pattern', type: 'varchar', length: 48, nullable: true })
  activeParticiplePattern?: string

  @ApiPropertyOptional({ example: 'مُفْعَل' })
  @Column({ name: 'passive_participle_pattern', type: 'varchar', length: 48, nullable: true })
  passiveParticiplePattern?: string

  @ApiPropertyOptional({ example: 'أَفْعِلْ' })
  @Column({ name: 'imperative_pattern', type: 'varchar', length: 48, nullable: true })
  imperativePattern?: string

  @ApiProperty({ description: 'What this bāb does to the meaning of its root' })
  @Column({ name: 'meaning_uz', type: 'text' })
  meaningUz!: string

  @ApiPropertyOptional()
  @Column({ name: 'meaning_ru', type: 'text', nullable: true })
  meaningRu?: string

  @ApiPropertyOptional()
  @Column({ name: 'meaning_en', type: 'text', nullable: true })
  meaningEn?: string

  @ApiPropertyOptional({ example: 'رسل', description: 'Root the worked example is built on' })
  @Column({ name: 'example_root', type: 'varchar', length: 16, nullable: true })
  exampleRoot?: string

  @ApiPropertyOptional({ example: 'أَرْسَلَ' })
  @Column({ name: 'example_word', type: 'varchar', length: 64, nullable: true })
  exampleWord?: string

  @ApiPropertyOptional({ example: 'yubordi' })
  @Column({ name: 'example_meaning', type: 'varchar', length: 160, nullable: true })
  exampleMeaning?: string

  @ApiProperty({ description: 'Distinct Quranic verbs in this bāb' })
  @Column({ name: 'lemma_count', type: 'integer', default: 0 })
  lemmaCount!: number

  @ApiProperty({ description: 'Quranic verb tokens in this bāb' })
  @Column({ name: 'token_count', type: 'integer', default: 0 })
  tokenCount!: number
}
