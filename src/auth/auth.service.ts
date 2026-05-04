import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { RoleEnum } from '../common/enums/role.enum'
import { t } from '../common/helpers/i18n.helper'
import { JwtPayload } from '../types/jwt-payload.type'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.login)

    if (!user) {
      throw new BadRequestException(t('common.user.not_found', 'User not found'))
    }

    const isMatch = await bcrypt.compare(dto.password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException(t('common.auth.invalid_credentials', 'Invalid credentials'))
    }

    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
      role: user.role
    }

    const { accessToken, refreshToken } = await this.generateTokenPair(payload)

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.fullName,
        username: user.username,
        role: user.role
      }
    }
  }

  async register(dto: RegisterDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match')
    }

    const { confirmPassword, ...createDto } = dto
    const user = await this.usersService.create({
      ...createDto,
      role: RoleEnum.STUDENT
    })

    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
      role: user.role
    }

    const tokens = await this.generateTokenPair(payload)
    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.fullName,
        username: user.username,
        role: user.role
      }
    }
  }

  async verifyAndRefresh(refreshToken: string) {
    try {
      const decoded: JwtPayload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET
      })

      const user = await this.usersService.findByUsername(decoded.username)
      if (!user) throw new BadRequestException(t('common.user.not_found', 'User not found'))

      const newPayload: JwtPayload = {
        id: user.id,
        username: user.username,
        role: user.role
      }

      const tokens = await this.generateTokenPair(newPayload)

      return { ...tokens, payload: newPayload }
    } catch (err) {
      if (err instanceof BadRequestException) throw err
      throw new UnauthorizedException(t('common.auth.invalid_refresh_token', 'Invalid refresh token'))
    }
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findOne(userId)
    return {
      id: user.id,
      name: user.fullName,
      username: user.username,
      role: user.role,
      email: user.email,
      phoneNumber: user.phoneNumber,
      region: user.region,
      district: user.district
    }
  }

  private async generateTokenPair(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: (process.env.JWT_ACCESS_EXPIRATION || '15m') as any
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: (process.env.JWT_REFRESH_EXPIRATION || '7d') as any
      })
    ])

    return { accessToken, refreshToken }
  }
}
