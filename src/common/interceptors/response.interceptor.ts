import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, map } from 'rxjs'

import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator'
import { t } from '../helpers/i18n.helper'

export interface Response<T> {
  data: T
  message: string
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const messageKey = this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ?? 'common.success'

    return next.handle().pipe(
      map((data: T) => ({
        data,
        message: t(messageKey, 'Successfully!')
      }))
    )
  }
}
