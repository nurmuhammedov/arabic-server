import { RoleEnum } from '../common/enums/role.enum'

export interface JwtPayload {
  id: string
  username: string
  role: RoleEnum
}
