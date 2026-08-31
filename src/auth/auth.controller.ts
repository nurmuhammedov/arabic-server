import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import type { Request, Response } from 'express'

import { Public } from '../common/decorators/public.decorator'
import { AuthGuard } from '../common/guards/auth.guard'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(dto)
    this.setCookies(res, data.accessToken, data.refreshToken)
    return data
  }

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.register(dto)
    this.setCookies(res, data.accessToken, data.refreshToken)
    return data
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = (req.cookies as Record<string, string | undefined>)['refresh_token']
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing')
    const data = await this.authService.verifyAndRefresh(refreshToken)
    this.setCookies(res, data.accessToken, data.refreshToken)
    return data
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current profile' })
  getProfile(@Req() req: Request & { user: { id: string } }) {
    return this.authService.getProfile(req.user.id)
  }

  @Public()
  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    return { success: true }
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production'
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: Number(process.env.JWT_ACCESS_COOKIE_MAX_AGE) || 15 * 60 * 1000
    })
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: Number(process.env.JWT_REFRESH_COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000
    })
  }
}
