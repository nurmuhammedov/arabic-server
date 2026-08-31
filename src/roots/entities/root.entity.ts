import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index, OneToMany } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { RootClassCode } from '../../sarf/enums/sarf.enum'
import type { Word } from '../../words/entities/word.entity'

@Entity({ name: 'roots' })
export class Root extends BaseEntity {
  @ApiProperty({ example: 'كتب', description: 'Root radicals without diacritics' })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 16 })
  radicals!: string

  @ApiProperty({ example: 3 })
  @Column({ name: 'letter_count', type: 'smallint' })
  letterCount!: number

  @ApiPropertyOptional({ example: 'yozish' })
  @Column({ name: 'meaning_uz', type: 'varchar', length: 255, nullable: true })
  meaningUz?: string

  @ApiPropertyOptional({ example: 'писать' })
  @Column({ name: 'meaning_ru', type: 'varchar', length: 255, nullable: true })
  meaningRu?: string

  @ApiPropertyOptional({ example: 'to write' })
  @Column({ name: 'meaning_en', type: 'varchar', length: 255, nullable: true })
  meaningEn?: string

  @ApiProperty({ description: 'How many Quran tokens derive from this root' })
  @Index()
  @Column({ name: 'occurrence_count', type: 'integer', default: 0 })
  occurrenceCount!: number

  @ApiProperty({ enum: RootClassCode, description: 'How this root behaves under conjugation' })
  @Index()
  @Column({ name: 'class_code', type: 'enum', enum: RootClassCode, nullable: true })
  classCode?: RootClassCode

  @ApiProperty({ description: 'How many distinct lemmas derive from this root' })
  @Column({ name: 'word_count', type: 'smallint', default: 0 })
  wordCount!: number

  @OneToMany('Word', (word: Word) => word.root)
  words?: Word[]
}
