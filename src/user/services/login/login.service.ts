import { getSvgCaptcha } from '@/utils/svgCaptcha'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoginService {
  async refreshVerifyCode(uuid: string) {
    const { verifyCodeSvg, error } = await getSvgCaptcha(uuid)
    return error ? error : { uuid, verifyCodeSvg }
  }
}
