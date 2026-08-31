import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { File } from '../../files/entities/file.entity'
import { Pattern } from '../../patterns/entities/pattern.entity'
import { Root } from '../../roots/entities/root.entity'
import { GlossStatus, PartOfSpeech, WordSource } from '../enums/word.enum'
import type { WordOccurrence } from './word-occurrence.entity'

@Entity({ name: 'words' })
@Index(['source', 'frequencyRank'])
@Index(['ownerId', 'source'])
export class Word extends BaseEntity {
  @ApiProperty({ example: 'كِتاب', description: 'Vocalised dictionary form (lemma)' })
  @Column({ type: 'varchar', length: 96 })
  arabic!: string

  @ApiProperty({ example: 'كتاب', description: 'Diacritic-stripped form, used for search' })
  @Index()
  @Column({ name: 'arabic_plain', type: 'varchar', length: 96 })
  arabicPlain!: string

  @ApiPropertyOptional({ example: 'kitāb' })
  @Column({ type: 'varchar', length: 96, nullable: true })
  transcription?: string

  @ApiPropertyOptional({ example: 'kitob' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  uz?: string

  @ApiPropertyOptional({ example: 'книга' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  ru?: string

  @ApiPropertyOptional({ example: 'book' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  en?: string

  @ApiPropertyOptional({ description: 'Longer note: usage, nuance, grammar' })
  @Column({ type: 'text', nullable: true })
  description?: string

  @ApiProperty({ enum: PartOfSpeech })
  @Column({ type: 'enum', enum: PartOfSpeech })
  pos!: PartOfSpeech

  @ApiPropertyOptional({ example: 'ACT_PCPL', description: 'Corpus sub-category tag' })
  @Column({ name: 'pos_detail', type: 'varchar', length: 32, nullable: true })
  posDetail?: string

  @ApiPropertyOptional({ example: 1, description: 'Verb form I-X, verbs only' })
  @Column({ name: 'verb_form', type: 'smallint', nullable: true })
  verbForm?: number

  @ApiPropertyOptional()
  @Column({ name: 'root_id', type: 'uuid', nullable: true })
  rootId?: string

  @ManyToOne(() => Root, (root) => root.words, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'root_id' })
  root?: Root

  @ApiPropertyOptional({ description: 'Morphological template this word is built on' })
  @Column({ name: 'pattern_id', type: 'uuid', nullable: true })
  patternId?: string

  @ManyToOne(() => Pattern, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'pattern_id' })
  pattern?: Pattern

  @ApiProperty({ description: 'Occurrences in the Quran' })
  @Column({ type: 'integer', default: 0 })
  frequency!: number

  @ApiProperty({ description: '1 = most frequent word in the Quran' })
  @Index()
  @Column({ name: 'frequency_rank', type: 'integer', nullable: true })
  frequencyRank?: number

  @ApiProperty({
    description: 'Share of all Quran tokens covered once this word and everything above it is known'
  })
  @Column({ name: 'cumulative_coverage', type: 'real', nullable: true })
  cumulativeCoverage?: number

  @ApiProperty({ enum: WordSource })
  @Column({ type: 'enum', enum: WordSource, default: WordSource.QURAN })
  source!: WordSource

  @ApiPropertyOptional({ description: 'Set for student-authored words; null for the shared catalogue' })
  @Column({ name: 'owner_id', type: 'uuid', nullable: true })
  ownerId?: string

  @ApiProperty({ enum: GlossStatus })
  @Index()
  @Column({ name: 'gloss_status', type: 'enum', enum: GlossStatus, default: GlossStatus.MISSING })
  glossStatus!: GlossStatus

  @ApiPropertyOptional()
  @Column({ name: 'audio_file_id', type: 'uuid', nullable: true })
  audioFileId?: string

  @OneToMany('WordOccurrence', (occurrence: WordOccurrence) => occurrence.word)
  occurrences?: WordOccurrence[]

  @ManyToMany(() => File)
  @JoinTable({
    name: 'word_images',
    joinColumn: { name: 'word_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' }
  })
  images?: File[]
}
