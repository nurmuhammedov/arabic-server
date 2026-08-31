import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

/**
 * The Quranic text, one row per verse, reconstructed from the corpus segments so
 * it stays byte-for-byte aligned with the word positions in `word_occurrences`.
 * This is what makes "show the word in a real ayah" possible.
 */
@Entity({ name: 'ayahs' })
@Index(['sura', 'ayah'], { unique: true })
export class Ayah {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ApiProperty({ example: 2 })
  @Column({ type: 'smallint' })
  sura!: number

  @ApiProperty({ example: 255 })
  @Column({ type: 'smallint' })
  ayah!: number

  @ApiProperty({ description: 'Fully vocalised verse text' })
  @Column({ type: 'text' })
  text!: string

  @ApiProperty({ description: 'Number of orthographic words in the verse' })
  @Column({ name: 'word_count', type: 'smallint' })
  wordCount!: number
}
