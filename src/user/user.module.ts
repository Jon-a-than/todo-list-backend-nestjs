import { Module } from '@nestjs/common'
import { RegisterModule } from './services/register/register.module'
import { LoginModule } from './services/login/login.module'
import { InfoModule } from './services/info/info.module';

@Module({
  imports: [RegisterModule, InfoModule, LoginModule],
})
export class UserModule {}
