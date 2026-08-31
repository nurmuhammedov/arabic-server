import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '../../common/entities/base.entity'
import { Deck } from '../../decks/entities/deck.entity'
import { User } from '../../users/entities/user.entity'

/** A deck a learner is working through — either self-selected or assigned by an admin. */
@Entity({ name: 'user_decks' })
@Index(['userId', 'deckId'], { unique: true })
export class UserDeck extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ApiProperty()
  @Column({ name: 'deck_id', type: 'uuid' })
  deckId!: string

  @ManyToOne(() => Deck, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deck_id' })
  deck!: Deck

  @ApiPropertyOptional({ description: 'Admin who assigned this deck; null when self-selected' })
  @Column({ name: 'assigned_by', type: 'uuid', nullable: true })
  assignedBy?: string

  @ApiProperty({ description: 'How many new words per day to introduce from this deck' })
  @Column({ name: 'daily_new_limit', type: 'smallint', default: 10 })
  dailyNewLimit!: number

  @ApiProperty()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean
}
