import * as svgCaptcha from 'svg-captcha'
import { redis } from './redis'
import { HttpException } from '@nestjs/common'

const baseOptions: svgCaptcha.ConfigObject = {
  noise: 3,
  width: 100,
  height: 34,
  color: true,
  fontSize: 35,
  background: '#fdba74',
}

export async function getSvgCaptcha(
  uuid: string,
  clearCount = false,
  options?: svgCaptcha.ConfigObject,
) {
  const { text, data } = svgCaptcha.create({
    ...baseOptions,
    ...options,
  })
  const uuidCount = clearCount ? 0 : +((await redis.get(uuid))?.at(-1) ?? '0')
  if (uuidCount >= 9) return { error: new HttpException('请求过于频繁', 429) }

  redis.set(uuid, text.toLowerCase() + '$' + (uuidCount + 1), 'EX', 60)
  return {
    text,
    verifyCodeSvg:
      'data:image/svg+xml;base64,' + Buffer.from(data).toString('base64'),
  }
}
