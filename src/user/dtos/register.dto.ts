import {
  Min,
  Max,
  IsInt,
  Length,
  MaxLength,
  MinLength,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator'
import { IsEqual } from '@/decorators/validators/IsEqual'

export class PhoneDto {
  @IsNotEmpty({ message: '手机号为空' })
  @IsPhoneNumber('CN', { message: '手机号格式错误' })
  phone: string
}

export class RegisterInfoDto {
  @IsNotEmpty({ message: '用户名为空' })
  @Length(3, 16, { message: '用户名长度不符合要求' })
  user: string

  @IsNotEmpty({ message: '密码为空' })
  @MinLength(6, { message: '密码过短' })
  @MaxLength(16, { message: '密码过长' })
  pwd1: string

  @IsNotEmpty({ message: '确认密码为空' })
  @IsEqual('pwd1', { message: '确认密码不一致' })
  pwd2: string

  @IsNotEmpty({ message: '手机号为空' })
  @IsPhoneNumber('CN', { message: '手机号格式错误' })
  phone: string

  @IsNotEmpty({ message: '验证码为空' })
  @IsInt()
  @Max(999999)
  @Min(100000)
  code: number
}
