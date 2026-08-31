import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { User } from '../../users/entities/user.entity'
import { Word } from '../../words/entities/word.entity'
import { CardState, StudyDirection } from '../enums/study.enum'

/**
 * One learner's memory state for one word in one direction.
 * Column names follow the ts-fsrs Card shape so scheduling is a direct mapping.
 */
@Entity({ name: 'user_cards' })
@Index(['userId', 'wordId', 'direction'], { unique: true })
@Index(['userId', 'dueAt'])
@Index(['userId', 'state'])
export class UserCard extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ApiProperty()
  @Column({ name: 'word_id', type: 'uuid' })
  wordId!: string

  @ManyToOne(() => Word, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'word_id' })
  word!: Word

  @ApiProperty({ enum: StudyDirection })
  @Column({ type: 'enum', enum: StudyDirection })
  direction!: StudyDirection

  @ApiProperty({ description: 'When this card next becomes reviewable' })
  @Column({ name: 'due_at', type: 'timestamptz' })
  dueAt!: Date

  @ApiProperty({ description: 'Days until recall probability drops to 90%' })
  @Column({ type: 'real', default: 0 })
  stability!: number

  @ApiProperty({ description: 'How hard this word is for this learner, 1..10' })
  @Column({ type: 'real', default: 0 })
  difficulty!: number

  @ApiProperty()
  @Column({ name: 'elapsed_days', type: 'real', default: 0 })
  elapsedDays!: number

  @ApiProperty()
  @Column({ name: 'scheduled_days', type: 'real', default: 0 })
  scheduledDays!: number

  @ApiProperty()
  @Column({ name: 'learning_steps', type: 'smallint', default: 0 })
  learningSteps!: number

  @ApiProperty()
  @Column({ type: 'integer', default: 0 })
  reps!: number

  @ApiProperty({ description: 'How many times this card was forgotten after being learned' })
  @Column({ type: 'integer', default: 0 })
  lapses!: number

  @ApiProperty({ enum: CardState })
  @Column({ type: 'enum', enum: CardState, default: CardState.NEW })
  state!: CardState

  @ApiProperty()
  @Column({ name: 'last_review_at', type: 'timestamptz', nullable: true })
  lastReviewAt?: Date

  @ApiProperty({ description: 'Set when the learner marks a card as suspended' })
  @Column({ type: 'boolean', default: false })
  suspended!: boolean
}
