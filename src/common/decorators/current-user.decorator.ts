import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import type { Request } from 'express'

import { type JwtPayload } from '../../types/jwt-payload.type'

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext): JwtPayload | undefined => {
  const request: Request = ctx.switchToHttp().getRequest()
  return request.user
})
