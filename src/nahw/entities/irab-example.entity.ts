import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { IrabCase, IrabCause } from '../enums/nahw.enum'

/**
 * A real Quranic word whose ending is explainable, harvested from the corpus
 * annotation. These drive the iʿrāb drill: the learner sees the verse, names the
 * case, and is shown what caused it.
 */
@Entity({ name: 'irab_examples' })
@Index(['cause', 'irabCase'])
export class IrabExample {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ApiProperty({ example: 2 })
  @Column({ type: 'smallint' })
  sura!: number

  @ApiProperty({ example: 255 })
  @Column({ type: 'smallint' })
  ayah!: number

  @ApiProperty({ description: 'Position of the target word inside the verse' })
  @Column({ name: 'word_index', type: 'smallint' })
  wordIndex!: number

  @ApiProperty({ example: 'ٱلْكِتَٰبِ', description: 'The target word as written' })
  @Column({ name: 'surface_form', type: 'varchar', length: 96 })
  surfaceForm!: string

  @ApiProperty({ enum: IrabCase })
  @Column({ name: 'irab_case', type: 'enum', enum: IrabCase })
  irabCase!: IrabCase

  @ApiProperty({ enum: IrabCause })
  @Column({ type: 'enum', enum: IrabCause })
  cause!: IrabCause

  @ApiPropertyOptional({ example: 'فِي', description: 'The word that caused the ending' })
  @Column({ name: 'trigger_form', type: 'varchar', length: 96, nullable: true })
  triggerForm?: string

  @ApiProperty({ description: 'Fewer words is easier; used to order the drill' })
  @Column({ name: 'ayah_words', type: 'smallint' })
  ayahWords!: number
}
