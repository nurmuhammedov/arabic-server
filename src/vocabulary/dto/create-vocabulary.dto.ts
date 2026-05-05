import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { VocabularyStatus } from '../enums/vocabulary-status.enum'

export class CreateVocabularyDto {
  @ApiProperty({ example: 'كتاب' })
  @IsNotEmpty()
  @IsString()
  arabic!: string

  @ApiPropertyOptional({ example: 'book' })
  @IsOptional()
  @IsString()
  transcriptionAr?: string

  @ApiProperty({ example: 'Book' })
  @IsNotEmpty()
  @IsString()
  uzbek!: string

  @ApiPropertyOptional({ example: 'Книга' })
  @IsOptional()
  @IsString()
  russian?: string

  @ApiPropertyOptional({ example: 'Book' })
  @IsOptional()
  @IsString()
  english?: string

  @ApiPropertyOptional({ example: 'book' })
  @IsOptional()
  @IsString()
  transcriptionEn?: string

  @ApiPropertyOptional({ type: [String], example: ['uuid-of-file'] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => (Array.isArray(value) && value.length === 0 ? null : value))
  imageIds?: string[]

  @ApiPropertyOptional({ type: [String], example: ['uuid1', 'uuid2'] })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @Transform(({ value }) => (Array.isArray(value) && value.length === 0 ? null : value))
  fileIds?: string[]

  @ApiPropertyOptional({ enum: VocabularyStatus, default: VocabularyStatus.NEW })
  @IsOptional()
  @IsEnum(VocabularyStatus)
  status?: VocabularyStatus

  @ApiPropertyOptional({ example: 'Some description about the word' })
  @IsOptional()
  @IsString()
  description?: string
}
