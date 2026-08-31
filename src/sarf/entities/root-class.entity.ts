import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { RootClassCode } from '../enums/sarf.enum'

/**
 * How a root behaves when it is poured into a template. A learner who knows
 * مَفْعُول still cannot produce مَقُول from قول without knowing that hollow roots
 * drop their middle letter — which is exactly what these classes teach.
 */
@Entity({ name: 'root_classes' })
export class RootClass extends BaseEntity {
  @ApiProperty({ enum: RootClassCode })
  @Index({ unique: true })
  @Column({ type: 'enum', enum: RootClassCode })
  code!: RootClassCode

  @ApiProperty({ example: 'أجوف' })
  @Column({ name: 'name_ar', type: 'varchar', length: 48 })
  nameAr!: string

  @ApiProperty({ example: 'Ichi bo‘sh o‘zak' })
  @Column({ name: 'name_uz', type: 'varchar', length: 96 })
  nameUz!: string

  @ApiProperty({ description: 'Ordering inside the curriculum' })
  @Column({ type: 'smallint' })
  position!: number

  @ApiProperty({ description: 'What makes a root belong to this class' })
  @Column({ name: 'definition_uz', type: 'text' })
  definitionUz!: string

  @ApiProperty({ description: 'What changes when this root is conjugated' })
  @Column({ name: 'rule_uz', type: 'text' })
  ruleUz!: string

  @ApiPropertyOptional()
  @Column({ name: 'definition_ru', type: 'text', nullable: true })
  definitionRu?: string

  @ApiPropertyOptional()
  @Column({ name: 'definition_en', type: 'text', nullable: true })
  definitionEn?: string

  @ApiPropertyOptional({ example: 'قول' })
  @Column({ name: 'example_root', type: 'varchar', length: 16, nullable: true })
  exampleRoot?: string

  @ApiPropertyOptional({ example: 'قالَ — “aytdi” (و tushib qolgan)' })
  @Column({ name: 'example_note', type: 'text', nullable: true })
  exampleNote?: string

  @ApiProperty({ description: 'Quranic roots in this class' })
  @Column({ name: 'root_count', type: 'integer', default: 0 })
  rootCount!: number

  @ApiProperty({ description: 'Quranic tokens derived from roots in this class' })
  @Column({ name: 'token_count', type: 'integer', default: 0 })
  tokenCount!: number
}
