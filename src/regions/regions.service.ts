import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Region } from './entities/region.entity'

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>
  ) {}

  async findAll() {
    return this.regionRepository.find({ order: { name: 'ASC' } })
  }

  async findOne(id: string) {
    const region = await this.regionRepository.findOne({ where: { id }, relations: ['districts'] })
    if (!region) throw new NotFoundException('Region not found')
    return region
  }

  async create(data: Partial<Region>) {
    const region = this.regionRepository.create(data)
    return this.regionRepository.save(region)
  }

  async update(id: string, data: Partial<Region>) {
    await this.findOne(id)
    await this.regionRepository.update(id, data)
    return this.findOne(id)
  }

  async remove(id: string) {
    const region = await this.findOne(id)
    await this.regionRepository.remove(region)
    return { success: true }
  }
}
