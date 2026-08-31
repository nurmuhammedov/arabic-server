import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { Ayah } from '../words/entities/ayah.entity'
import { Particle } from './entities/particle.entity'
import { ParticleCategory } from './enums/huruf.enum'

@Injectable()
export class HurufService {
  constructor(
    @InjectRepository(Particle) private readonly particles: Repository<Particle>,
    @InjectRepository(Ayah) private readonly ayahs: Repository<Ayah>
  ) {}

  async findAll(category?: ParticleCategory) {
    const query = this.particles.createQueryBuilder('particle')
    if (category) query.where('particle.category = :category', { category })

    return query.orderBy('particle.frequency', 'DESC').getMany()
  }

  /** Grouped the way the curriculum presents them, most useful group first. */
  async byCategory() {
    const all = await this.particles.find({ order: { frequency: 'DESC' } })

    const groups = new Map<ParticleCategory, Particle[]>()
    for (const particle of all) {
      const bucket = groups.get(particle.category) ?? []
      bucket.push(particle)
      groups.set(particle.category, bucket)
    }

    return [...groups.entries()]
      .map(([category, particles]) => ({
        category,
        particles,
        frequency: particles.reduce((sum, p) => sum + p.frequency, 0)
      }))
      .sort((a, b) => b.frequency - a.frequency)
  }

  async findOne(id: string) {
    const particle = await this.particles.findOne({ where: { id } })
    if (!particle) throw new NotFoundException(t('common.particle.not_found', 'Particle not found'))

    const example =
      particle.exampleSura && particle.exampleAyah
        ? await this.ayahs.findOne({ where: { sura: particle.exampleSura, ayah: particle.exampleAyah } })
        : null

    return { ...particle, example }
  }
}
