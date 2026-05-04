import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthGuard } from '../common/guards/auth.guard'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SECRET',
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN || '36000s') as any }
    })
  ],
  exports: [AuthService, AuthGuard, JwtModule]
})
export class AuthModule {}
