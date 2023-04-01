import * as svgCaptcha from 'svg-captcha'
import { redis } from './redis'

const baseOptions: svgCaptcha.ConfigObject = {
  noise: 3,
  width: 100,
  height: 34,
  color: true,
  fontSize: 35,
  background: '#fdba74',
}

export function getSvgCaptcha(uuid: string, options?: svgCaptcha.ConfigObject) {
  const { text, data } = svgCaptcha.create({
    ...baseOptions,
    ...options,
  })
  redis.set(uuid, text.toLowerCase(), 'EX', 60)
  return {
    text,
    verifyCodeSvg:
      'data:image/svg+xml;base64,' + Buffer.from(data).toString('base64'),
  }
}
