import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

import { t } from '../common/helpers/i18n.helper'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

const PUBLIC_FIELDS = [
  'user.id',
  'user.createdAt',
  'user.updatedAt',
  'user.username',
  'user.email',
  'user.fullName',
  'user.phoneNumber',
  'user.role'
] as const

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(params: { page?: number; limit?: number; search?: string }) {
    const { page = 1, limit = 20, search } = params
    const query = this.userRepository.createQueryBuilder('user').select([...PUBLIC_FIELDS])

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
      page: { totalElements, totalPages: Math.ceil(totalElements / limit) }
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([...PUBLIC_FIELDS])
      .where('user.id = :id', { id })
      .getOne()

    if (!user) throw new NotFoundException(t('common.user.not_found', 'User not found'))
    return user
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'role', 'fullName', 'email']
    })
  }

  async create(dto: CreateUserDto) {
    const existing = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
      select: ['id']
    })

    if (existing) {
      throw new ConflictException(t('common.user.already_exists', 'Username or email already exists'))
    }

    const user = this.userRepository.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    })

    const saved = await this.userRepository.save(user)
    return this.findOne(saved.id)
  }

  async update(id: string, dto: Partial<CreateUserDto>) {
    await this.findOne(id)

    const patch: Partial<User> = { ...dto }
    if (dto.password) {
      patch.password = await bcrypt.hash(dto.password, 10)
    }

    await this.userRepository.update(id, patch)
    return this.findOne(id)
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepository.delete(user.id)
    return { success: true }
  }
}
