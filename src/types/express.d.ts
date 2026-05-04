import { JwtPayload } from './jwt-payload.type'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
      query?: Record<string, string | string[]>
    }
  }
}
