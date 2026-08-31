import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Root } from '../roots/entities/root.entity'
import { Word } from '../words/entities/word.entity'
import { RootClass } from './entities/root-class.entity'
import { VerbForm } from './entities/verb-form.entity'
import { SarfController } from './sarf.controller'
import { SarfService } from './sarf.service'

@Module({
  imports: [TypeOrmModule.forFeature([VerbForm, RootClass, Root, Word])],
  controllers: [SarfController],
  providers: [SarfService],
  exports: [TypeOrmModule]
})
export class SarfModule {}
