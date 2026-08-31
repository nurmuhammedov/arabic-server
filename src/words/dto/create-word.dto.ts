import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator'

import { GlossStatus, PartOfSpeech } from '../enums/word.enum'

export class CreateWordDto {
  @ApiProperty({ example: 'كِتاب', description: 'Vocalised dictionary form' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(96)
  arabic!: string

  @ApiPropertyOptional({ example: 'kitāb' })
  @IsOptional()
  @IsString()
  @MaxLength(96)
  transcription?: string

  @ApiPropertyOptional({ example: 'kitob' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  uz?: string

  @ApiPropertyOptional({ example: 'книга' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  ru?: string

  @ApiPropertyOptional({ example: 'book' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  en?: string

  @ApiPropertyOptional({ description: 'Longer note: usage, nuance, grammar' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ enum: PartOfSpeech })
  @IsEnum(PartOfSpeech)
  pos!: PartOfSpeech

  @ApiPropertyOptional({ description: 'Verb form I-X, verbs only' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  verbForm?: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  rootId?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  patternId?: string

  @ApiPropertyOptional({ enum: GlossStatus, description: 'Admin only; students always get DRAFT' })
  @IsOptional()
  @IsEnum(GlossStatus)
  glossStatus?: GlossStatus
}
