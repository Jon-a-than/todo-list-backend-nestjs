import { Injectable } from '@nestjs/common'
import { sendVerifyCode } from '@/utils/aliSMS'
import { hashPassword } from '@/utils/hashVerify'
import { UserDBService } from '../userDB/userDB.service'
import { defineResponseData, ResponseData, Status } from '@/types'

interface PhoneCode {
  createAt: number
  phone: string
  code: number
  searched: number
}

/** @info 验证码生成与校验模块 */
class PhoneCodeModule {
  protected phoneCodeMap = new Map<string, PhoneCode>()

  /** @info 生成验证码 */
  protected createCode = (phone: string) => {
    const code = ~~(Math.random() * 900000) + 100000
    this.phoneCodeMap.set(phone, {
      createAt: new Date().getTime(),
      searched: 0,
      phone,
      code,
    })

    return code
  }

  /** @info 校验验证码 */
  protected checkPhoneCode = (phone: string, code: number): Status => {
    if (!this.phoneCodeMap.has(phone)) return Status.CODE_NULL

    const phoneCodeInfo = this.phoneCodeMap.get(phone)
    if (phoneCodeInfo.searched < 3) {
      this.phoneCodeMap.set(phone, {
        code: phoneCodeInfo.code,
        phone: phoneCodeInfo.phone,
        createAt: phoneCodeInfo.createAt,
        searched: phoneCodeInfo.searched + 1,
      })
    } else {
      this.phoneCodeMap.delete(phone)
      return Status.CODE_MATCH_MUCH
    }

    if (new Date().getTime() - phoneCodeInfo.createAt > 5 * 60000) {
      this.phoneCodeMap.delete(phone)
      return Status.CODE_TIMEOUT
    } else if (phoneCodeInfo.code !== code) return Status.CODE_ERROR

    this.phoneCodeMap.delete(phone)
    return Status.SUCCESS
  }
}

@Injectable()
export class RegisterService extends PhoneCodeModule {
  constructor(protected readonly userDBservice: UserDBService) {
    super()
  }

  /** @info 生成用户uid */
  protected async createUid() {
    let uid = ~~(Math.random() * 900_000_000) + 100_000_000 + ''
    while (await this.userDBservice.findOne({ uid })) {
      uid = ~~(Math.random() * 900_000_000) + 100_000_000 + ''
    }
    return uid
  }

  protected async hasRegistered(user: string, phone: string): Promise<Status> {
    const hasUserRegistered = await this.userDBservice.findOne({ user })
    if (hasUserRegistered) return Status.USER_EXIST
    const hasPhoneRegistered = await this.userDBservice.findOne({ phone })
    if (hasPhoneRegistered) return Status.PHONE_EXIST
    return Status.SUCCESS
  }

  /** @info 数据库新增用户 */
  async addUser(user: string, phone: string, pwd: string): Promise<boolean> {
    const hasRegistered = await this.userDBservice.findOne({
      $or: [{ user }, { phone }],
    })
    if (hasRegistered) return false

    const uid = await this.createUid()
    return await this.userDBservice.insertOne({
      user,
      phone,
      pwd: hashPassword(pwd),
      uid,
    })
  }

  /** @info 注册 */
  async register(
    user: string,
    pwd1: string,
    pwd2: string,
    phone: string,
    code: number,
  ): Promise<ResponseData> {
    if (!(user && pwd1 && pwd2 && phone && code))
      return defineResponseData('参数不完整', Status.PARAM_LESS)
    if (pwd1 !== pwd2) {
      return defineResponseData('密码不一致', Status.PARAM_ERROR)
    } else if (user.length < 3 || user.length > 16) {
      return defineResponseData('用户名长度不符合要求', Status.PARAM_ERROR)
    } else if (
      pwd1.length + pwd2.length < 12 ||
      pwd1.length + pwd2.length > 32
    ) {
      return defineResponseData('密码长度不符合要求', Status.PARAM_ERROR)
    }

    const hasRegistered = await this.hasRegistered(user, phone)
    if (hasRegistered !== Status.SUCCESS) {
      return defineResponseData(
        hasRegistered === Status.USER_EXIST ? '用户名已被注册' : '手机号已存在',
        hasRegistered,
      )
    }

    const checkRes = this.checkPhoneCode(phone, code)
    switch (checkRes) {
      case Status.CODE_NULL:
        return defineResponseData('未发送验证码或已过期', Status.CODE_NULL)
      case Status.CODE_MATCH_MUCH:
        return defineResponseData('验证码错误次数过多', Status.CODE_MATCH_MUCH)
      case Status.CODE_TIMEOUT:
        return defineResponseData('验证码已超时', Status.CODE_TIMEOUT)
      case Status.CODE_ERROR:
        return defineResponseData('验证码错误', Status.CODE_ERROR)
      case Status.SUCCESS:
        return (await this.addUser(user, phone, pwd1))
          ? defineResponseData('注册成功', Status.SUCCESS, { user, pwd1 })
          : defineResponseData('数据库错误', Status.MONGO_INSERT_ERROR)
      default:
        return defineResponseData('未知错误', Status.SERVER_ERROR)
    }
  }

  /** @TODO 短信发送验证码 */
  async sendCode(phone: string): Promise<ResponseData> {
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
      return defineResponseData('手机号格式错误', Status.PARAM_ERROR)
    }

    const code = this.createCode(phone)
    return (await sendVerifyCode(code, phone))
      ? defineResponseData('发送验证码成功', Status.SUCCESS, { code, phone })
      : defineResponseData('发送验证码失败', Status.SMS_SEND_ERROR)
  }
}
