import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDBModule } from '@/user/userDB/userDB.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategys/local.strategy'
import { JwtStrategy } from './strategys/jwt.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from './constants/sectet'

@Module({
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserDBModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '72h' },
    }),
  ],
})
export class AuthModule {}
