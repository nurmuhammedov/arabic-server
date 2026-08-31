import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Ayah } from '../words/entities/ayah.entity'
import { IrabExample } from './entities/irab-example.entity'
import { NahwTopic } from './entities/nahw-topic.entity'
import { NahwController } from './nahw.controller'
import { NahwService } from './nahw.service'

@Module({
  imports: [TypeOrmModule.forFeature([NahwTopic, IrabExample, Ayah])],
  controllers: [NahwController],
  providers: [NahwService],
  exports: [TypeOrmModule]
})
export class NahwModule {}
