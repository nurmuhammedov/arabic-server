import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { Request, Response } from 'express'

import { AuthService } from '../../auth/auth.service'
import { JwtPayload } from '../../types/jwt-payload.type'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { t } from '../helpers/i18n.helper'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()

    const accessToken = request.cookies?.['access_token'] as string | undefined
    const refreshToken = request.cookies?.['refresh_token'] as string | undefined

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException(t('common.auth.no_token', 'Unauthorized access (Token missing)'))
    }

    try {
      if (accessToken) {
        request.user = await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
          secret: process.env.JWT_ACCESS_SECRET
        })
        return true
      }
      throw new TokenExpiredError('No access token', new Date())
    } catch (err) {
      if (err instanceof TokenExpiredError && refreshToken) {
        try {
          const {
            accessToken: newAccess,
            refreshToken: newRefresh,
            payload
          } = await this.authService.verifyAndRefresh(refreshToken)

          const maxAgeAccess = Number(process.env.JWT_ACCESS_COOKIE_MAX_AGE) || 15 * 60 * 1000
          const maxAgeRefresh = Number(process.env.JWT_REFRESH_COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000

          const isProduction = process.env.NODE_ENV === 'production'
          response.cookie('access_token', newAccess, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: maxAgeAccess
          })

          response.cookie('refresh_token', newRefresh, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: maxAgeRefresh
          })

          request.user = payload
          return true
        } catch {
          throw new UnauthorizedException(t('common.auth.invalid_token', 'Token is invalid or expired'))
        }
      }

      throw new UnauthorizedException(t('common.auth.invalid_token', 'Token is invalid or expired'))
    }
  }
}
