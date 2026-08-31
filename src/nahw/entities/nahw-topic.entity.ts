import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { NahwTopicKind } from '../enums/nahw.enum'

/**
 * One naḥw lesson. Ṣarf explains what a word is; naḥw explains what it is doing
 * in the sentence, which is the difference between knowing every word of an ayah
 * and knowing who did what to whom.
 */
@Entity({ name: 'nahw_topics' })
@Index(['kind', 'position'])
export class NahwTopic extends BaseEntity {
  @ApiProperty({ example: 'majrur' })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 64 })
  slug!: string

  @ApiProperty({ example: 'مجرور' })
  @Column({ name: 'title_ar', type: 'varchar', length: 96 })
  titleAr!: string

  @ApiProperty({ example: 'Majrur — kasrali holat' })
  @Column({ name: 'title_uz', type: 'varchar', length: 160 })
  titleUz!: string

  @ApiProperty({ enum: NahwTopicKind })
  @Column({ type: 'enum', enum: NahwTopicKind })
  kind!: NahwTopicKind

  @ApiProperty()
  @Column({ type: 'smallint' })
  position!: number

  @ApiProperty({ description: 'One-line summary for the list view' })
  @Column({ name: 'summary_uz', type: 'varchar', length: 255 })
  summaryUz!: string

  @ApiProperty({ description: 'The lesson itself, in plain language with worked examples' })
  @Column({ name: 'body_uz', type: 'text' })
  bodyUz!: string

  @ApiPropertyOptional()
  @Column({ name: 'summary_ru', type: 'varchar', length: 255, nullable: true })
  summaryRu?: string

  @ApiPropertyOptional()
  @Column({ name: 'summary_en', type: 'varchar', length: 255, nullable: true })
  summaryEn?: string

  @ApiPropertyOptional({ example: 2 })
  @Column({ name: 'example_sura', type: 'smallint', nullable: true })
  exampleSura?: number

  @ApiPropertyOptional({ example: 255 })
  @Column({ name: 'example_ayah', type: 'smallint', nullable: true })
  exampleAyah?: number

  @ApiPropertyOptional({ description: 'What to notice in the example verse' })
  @Column({ name: 'example_note_uz', type: 'text', nullable: true })
  exampleNoteUz?: string
}
