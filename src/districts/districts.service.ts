import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { District } from './entities/district.entity'

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>
  ) {}

  async findAll(regionId?: string) {
    const where = regionId ? { regionId } : {}
    return this.districtRepository.find({ where, order: { name: 'ASC' } })
  }

  async findOne(id: string) {
    const district = await this.districtRepository.findOne({ where: { id }, relations: ['region'] })
    if (!district) throw new NotFoundException('District not found')
    return district
  }

  async create(data: Partial<District>) {
    const district = this.districtRepository.create(data)
    return this.districtRepository.save(district)
  }

  async update(id: string, data: Partial<District>) {
    await this.findOne(id)
    await this.districtRepository.update(id, data)
    return this.findOne(id)
  }

  async remove(id: string) {
    const district = await this.findOne(id)
    await this.districtRepository.remove(district)
    return { success: true }
  }
}
