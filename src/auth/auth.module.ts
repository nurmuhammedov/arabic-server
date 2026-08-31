import { Global, Module } from '@nestjs/common'
import { JwtModule, JwtSignOptions } from '@nestjs/jwt'

import { AuthGuard } from '../common/guards/auth.guard'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: (process.env.JWT_ACCESS_EXPIRATION || '15m') as JwtSignOptions['expiresIn'] }
    })
  ],
  exports: [AuthService, AuthGuard, JwtModule]
})
export class AuthModule {}
