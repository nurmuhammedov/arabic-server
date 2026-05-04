import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll() {
    return this.userRepository.find({
      relations: ['region', 'district'],
      order: { createdAt: 'DESC' }
    })
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['region', 'district']
    })
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
