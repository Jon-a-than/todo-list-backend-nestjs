import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from '@/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from './constants/sectet'

@Module({
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '72h' },
    }),
  ],
})
export class AuthModule {}
