import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { CardState, ReviewGrade } from '../enums/study.enum'
import { UserCard } from './user-card.entity'

/**
 * Append-only record of every answer. Needed to roll back a mis-tap, to draw
 * progress charts, and to re-optimise FSRS parameters per learner later on.
 */
@Entity({ name: 'review_logs' })
@Index(['userId', 'reviewedAt'])
export class ReviewLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Index()
  @Column({ name: 'user_card_id', type: 'uuid' })
  userCardId!: string

  @ManyToOne(() => UserCard, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_card_id' })
  userCard!: UserCard

  @ApiProperty()
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string

  @ApiProperty({ enum: ReviewGrade })
  @Column({ type: 'smallint' })
  grade!: ReviewGrade

  @ApiProperty({ enum: CardState, description: 'State the card was in before this answer' })
  @Column({ type: 'enum', enum: CardState })
  state!: CardState

  @ApiProperty({ description: 'Due date the card carried into this review' })
  @Column({ name: 'due_at', type: 'timestamptz' })
  dueAt!: Date

  @ApiProperty()
  @Column({ type: 'real' })
  stability!: number

  @ApiProperty()
  @Column({ type: 'real' })
  difficulty!: number

  @ApiProperty()
  @Column({ name: 'elapsed_days', type: 'real' })
  elapsedDays!: number

  @ApiProperty()
  @Column({ name: 'last_elapsed_days', type: 'real' })
  lastElapsedDays!: number

  @ApiProperty()
  @Column({ name: 'scheduled_days', type: 'real' })
  scheduledDays!: number

  @ApiProperty({ description: 'How long the learner spent on the card' })
  @Column({ name: 'duration_ms', type: 'integer', nullable: true })
  durationMs?: number

  @ApiProperty()
  @CreateDateColumn({ name: 'reviewed_at', type: 'timestamptz' })
  reviewedAt!: Date
}
