import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

import { JwtPayload } from '../../types/jwt-payload.type'

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext): JwtPayload | undefined => {
  const request: Request = ctx.switchToHttp().getRequest()
  return request.user
})
