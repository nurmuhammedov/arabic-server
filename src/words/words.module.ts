import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Ayah } from './entities/ayah.entity'
import { WordOccurrence } from './entities/word-occurrence.entity'
import { Word } from './entities/word.entity'
import { WordsController } from './words.controller'
import { WordsService } from './words.service'

@Module({
  imports: [TypeOrmModule.forFeature([Word, WordOccurrence, Ayah])],
  controllers: [WordsController],
  providers: [WordsService],
  exports: [TypeOrmModule, WordsService]
})
export class WordsModule {}
