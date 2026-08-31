import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Word } from '../words/entities/word.entity'
import { Root } from './entities/root.entity'
import { RootsController } from './roots.controller'
import { RootsService } from './roots.service'

@Module({
  imports: [TypeOrmModule.forFeature([Root, Word])],
  controllers: [RootsController],
  providers: [RootsService],
  exports: [TypeOrmModule]
})
export class RootsModule {}
