import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(params: { page?: number; limit?: number; search?: string }) {
    const { page = 1, limit = 20, search } = params
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.region', 'region')
      .leftJoin('user.district', 'district')
      .select([
        'user.id',
        'user.createdAt',
        'user.updatedAt',
        'user.username',
        'user.email',
        'user.fullName',
        'user.phoneNumber',
        'user.role',
        'region.id',
        'region.name',
        'district.id',
        'district.name'
      ])

    if (search) {
      query.andWhere('(user.fullName ILIKE :search OR user.username ILIKE :search OR user.email ILIKE :search)', {
        search: `%${search}%`
      })
    }

    const [content, totalElements] = await query
      .orderBy('user.createdAt', 'DESC')
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

  async findOne(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.region', 'region')
      .leftJoin('user.district', 'district')
      .select([
        'user.id',
        'user.createdAt',
        'user.updatedAt',
        'user.username',
        'user.email',
        'user.fullName',
        'user.phoneNumber',
        'user.role',
        'region.id',
        'region.name',
        'district.id',
        'district.name'
      ])
      .where('user.id = :id', { id })
      .getOne()

    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'role', 'fullName', 'email']
    })
  }

  async create(dto: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }]
    })
    if (existing) {
      throw new ConflictException('Username or email already exists')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword
    })

    return this.userRepository.save(user)
  }

  async update(id: string, dto: Partial<CreateUserDto>) {
    const user = await this.findOne(id)
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10)
    }
    Object.assign(user, dto)
    return this.userRepository.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
    return { success: true }
  }
}
