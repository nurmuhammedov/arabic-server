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

  async findAll(params: { page?: number; limit?: number; search?: string }) {
    const { page = 1, limit = 10, search } = params
    const query = this.regionRepository
      .createQueryBuilder('region')
      .select(['region.id', 'region.createdAt', 'region.updatedAt', 'region.name', 'region.soato'])

    if (search) {
      query.andWhere('region.name ILIKE :search', { search: `%${search}%` })
    }

    const [content, totalElements] = await query
      .orderBy('region.name', 'ASC')
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

  async select() {
    return this.regionRepository.find({
      select: ['id', 'name'],
      order: { name: 'ASC' }
    })
  }

  async findOne(id: string) {
    const region = await this.regionRepository
      .createQueryBuilder('region')
      .leftJoin('region.districts', 'districts')
      .select([
        'region.id',
        'region.createdAt',
        'region.updatedAt',
        'region.name',
        'region.soato',
        'districts.id',
        'districts.name'
      ])
      .where('region.id = :id', { id })
      .getOne()

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
