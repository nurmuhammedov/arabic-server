import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../users/entities/user.entity'
import { Word } from '../words/entities/word.entity'
import { ReviewLog } from './entities/review-log.entity'
import { UserCard } from './entities/user-card.entity'
import { UserDeck } from './entities/user-deck.entity'
import { StudyController } from './study.controller'
import { StudyService } from './study.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserCard, ReviewLog, UserDeck, Word, User])],
  controllers: [StudyController],
  providers: [StudyService],
  exports: [TypeOrmModule, StudyService]
})
export class StudyModule {}
