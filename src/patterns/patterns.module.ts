import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Word } from '../words/entities/word.entity'
import { Pattern } from './entities/pattern.entity'
import { PatternsController } from './patterns.controller'
import { PatternsService } from './patterns.service'

@Module({
  imports: [TypeOrmModule.forFeature([Pattern, Word])],
  controllers: [PatternsController],
  providers: [PatternsService],
  exports: [TypeOrmModule]
})
export class PatternsModule {}
