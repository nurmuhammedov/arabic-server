import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DecksController } from './decks.controller'
import { DecksService } from './decks.service'
import { DeckWord } from './entities/deck-word.entity'
import { Deck } from './entities/deck.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Deck, DeckWord])],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [TypeOrmModule]
})
export class DecksModule {}
