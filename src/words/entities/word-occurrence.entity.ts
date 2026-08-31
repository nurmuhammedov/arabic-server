import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import type { Word } from './word.entity'

/**
 * One row per place the lemma appears in the Quran. Powers context exercises
 * ("show me this word in a real ayah") and surah/juz decks.
 */
@Entity({ name: 'word_occurrences' })
@Index(['sura', 'ayah'])
export class WordOccurrence {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ApiProperty()
  @Index()
  @Column({ name: 'word_id', type: 'uuid' })
  wordId!: string

  @ManyToOne('Word', (word: Word) => word.occurrences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'word_id' })
  word!: Word

  @ApiProperty({ example: 2 })
  @Column({ type: 'smallint' })
  sura!: number

  @ApiProperty({ example: 255 })
  @Column({ type: 'smallint' })
  ayah!: number

  @ApiProperty({ example: 4, description: 'Word position within the ayah' })
  @Column({ name: 'word_index', type: 'smallint' })
  wordIndex!: number

  @ApiProperty({ example: 'ٱلْكِتَٰبَ', description: 'Inflected form as it appears in the mushaf' })
  @Column({ name: 'surface_form', type: 'varchar', length: 96 })
  surfaceForm!: string
}
