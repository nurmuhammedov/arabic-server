import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator'

import { ReviewGrade, StudyDirection } from '../enums/study.enum'

export class SessionQueryDto {
  @ApiPropertyOptional({ description: 'Restrict the queue to one deck' })
  @IsOptional()
  @IsUUID()
  deckId?: string

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number
}

export class AnswerDto {
  @ApiProperty()
  @IsUUID()
  wordId!: string

  @ApiProperty({ enum: StudyDirection })
  @IsEnum(StudyDirection)
  direction!: StudyDirection

  @ApiProperty({ enum: ReviewGrade, description: '1 Again, 2 Hard, 3 Good, 4 Easy' })
  @Type(() => Number)
  @IsEnum(ReviewGrade)
  grade!: ReviewGrade

  @ApiPropertyOptional({ description: 'How long the learner spent on the card' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  durationMs?: number
}

export class AddDeckDto {
  @ApiProperty()
  @IsUUID()
  deckId!: string

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  dailyNewLimit?: number
}
