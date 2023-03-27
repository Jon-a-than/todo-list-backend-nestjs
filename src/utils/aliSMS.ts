import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525'
import * as $OpenApi from '@alicloud/openapi-client'
import Util, * as $Util from '@alicloud/tea-util'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.secret.env' })

const client = createClient()
export { sendVerifyCode }

/**
 * 发送短信验证码
 * @param verifyCode 验证码
 * @param phone 手机号
 * @returns 是否发送成功
 */
async function sendVerifyCode(
  verifyCode: number,
  phone: string,
): Promise<boolean> {
  const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
    signName: '清山Blog',
    templateCode: 'SMS_274760568',
    phoneNumbers: phone,
    templateParam: `{"code":"${verifyCode}"}`,
  })

  const runtime = new $Util.RuntimeOptions({})
  try {
    const res = await client.sendSmsWithOptions(sendSmsRequest, runtime)
    console.log('res: ', res)
    if (res.body.code === 'OK') return true
  } catch (error) {
    Util.assertAsString(error.message)
    console.log('error: ', error)
  }

  return false
}

/**
 * 创建短信客户端
 * @returns 短信客户端
 */
function createClient(): Dysmsapi20170525 {
  const { ACCESS_KEY_ID, ACCESS_KEY_SECRET } = process.env
  const config = new $OpenApi.Config({
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
  })
  config.endpoint = `dysmsapi.aliyuncs.com`
  return new Dysmsapi20170525(config)
}
