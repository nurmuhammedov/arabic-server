import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Word } from '../../words/entities/word.entity'
import type { Deck } from './deck.entity'

@Entity({ name: 'deck_words' })
@Index(['deckId', 'position'])
@Index(['deckId', 'wordId'], { unique: true })
export class DeckWord {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'deck_id', type: 'uuid' })
  deckId!: string

  @ManyToOne('Deck', (deck: Deck) => deck.words, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deck_id' })
  deck!: Deck

  @Index()
  @Column({ name: 'word_id', type: 'uuid' })
  wordId!: string

  @ManyToOne(() => Word, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'word_id' })
  word!: Word

  @Column({ type: 'integer', default: 0 })
  position!: number
}
