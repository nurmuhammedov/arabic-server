import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FilesModule } from '../files/files.module'
import { Vocabulary } from './entities/vocabulary.entity'
import { VocabularyController } from './vocabulary.controller'
import { VocabularyService } from './vocabulary.service'

@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary]), FilesModule],
  controllers: [VocabularyController],
  providers: [VocabularyService],
  exports: [VocabularyService]
})
export class VocabularyModule {}
