import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { AuthGuard } from '../common/guards/auth.guard'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Tizimga kirish' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(dto)
    this.setCookies(res, data.accessToken, data.refreshToken)
    return data
  }

  @Post('register')
  @ApiOperation({ summary: 'Ro‘yxatdan o‘tish' })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.register(dto)
    this.setCookies(res, data.accessToken, data.refreshToken)
    return data
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Tokenni yangilash' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token']
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing')

    const data = await this.authService.verifyAndRefresh(refreshToken)
    this.setCookies(res, data.accessToken, data.refreshToken)
    return data
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Profil ma’lumotlarini olish' })
  getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user.id)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Tizimdan chiqish' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    return { success: true }
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 min
    })
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
  }
}
