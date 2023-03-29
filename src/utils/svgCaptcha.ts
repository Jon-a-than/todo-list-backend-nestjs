import svgCaptcha, { ConfigObject } from 'svg-captcha'

const baseOptions: ConfigObject = {
  noise: 3,
  width: 100,
  height: 30,
  color: true,
  fontSize: 30,
  background: '#0000',
}

export function getSvgCaptcha(options?: ConfigObject) {
  return svgCaptcha.create({
    ...baseOptions,
    ...options,
  })
}
