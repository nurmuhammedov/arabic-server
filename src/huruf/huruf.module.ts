import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Ayah } from '../words/entities/ayah.entity'
import { Particle } from './entities/particle.entity'
import { HurufController } from './huruf.controller'
import { HurufService } from './huruf.service'

@Module({
  imports: [TypeOrmModule.forFeature([Particle, Ayah])],
  controllers: [HurufController],
  providers: [HurufService],
  exports: [TypeOrmModule]
})
export class HurufModule {}
