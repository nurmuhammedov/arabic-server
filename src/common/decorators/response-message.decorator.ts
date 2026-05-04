import { SetMetadata } from '@nestjs/common'

export const RESPONSE_MESSAGE = 'response_message'
export const ResponseMessage = (messageKey: string) => SetMetadata(RESPONSE_MESSAGE, messageKey)
