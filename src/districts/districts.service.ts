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

  async findAll(params: { page?: number; limit?: number; search?: string; regionId?: string }) {
    const { page = 1, limit = 20, search, regionId } = params
    const query = this.districtRepository
      .createQueryBuilder('district')
      .leftJoin('district.region', 'region')
      .select([
        'district.id',
        'district.createdAt',
        'district.updatedAt',
        'district.name',
        'district.soato',
        'region.id',
        'region.name'
      ])

    if (regionId) {
      query.andWhere('district.regionId = :regionId', { regionId })
    }

    if (search) {
      query.andWhere('district.name ILIKE :search', { search: `%${search}%` })
    }

    const [content, totalElements] = await query
      .orderBy('district.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return {
      content,
      page: {
        totalElements,
        totalPages: Math.ceil(totalElements / limit)
      }
    }
  }

  async select(regionId?: string) {
    const where = regionId ? { regionId } : {}
    return this.districtRepository.find({
      where,
      select: ['id', 'name', 'regionId'],
      order: { name: 'ASC' }
    })
  }

  async findOne(id: string) {
    const district = await this.districtRepository
      .createQueryBuilder('district')
      .leftJoin('district.region', 'region')
      .select([
        'district.id',
        'district.createdAt',
        'district.updatedAt',
        'district.name',
        'district.soato',
        'region.id',
        'region.name'
      ])
      .where('district.id = :id', { id })
      .getOne()

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
