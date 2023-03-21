import { Injectable } from '@nestjs/common'

@Injectable()
export class RegisterService {
  register(user: string, code: number) {
    return {
      message: '注册成功',
      data: {
        user,
        code,
      },
    }
  }

  sendCode(phone: string) {
    return {
      message: '发送验证码成功',
      data: {
        phone,
      },
    }
  }
}
