import { redis } from '@/utils/redis'
import { Injectable } from '@nestjs/common'
import { sendVerifyCode } from '@/utils/aliSMS'
import { hashPassword } from '@/utils/hashVerify'
import { UserDBService } from '@/databases/user/userDB.service'
import { defineResponseData, ResponseData, Status } from '@/types'

import type { Register } from '@/user/interfaces/register.interface'

/** @info 验证码生成与校验模块 */
class PhoneCodeModule {
  /** @info 生成验证码 */
  protected createCode = (phone: string) => {
    const code = ~~(Math.random() * 900000) + 100000
    redis.set(phone, `${code}$0$${new Date().getTime() + 60 * 1000}`, 'EX', 300)

    return code
  }

  /**
   * @info 校验验证码
   * @param phone 手机号
   * @param code 验证码
   * @description 5分钟内有效(由redis控制，超时自动删除键值对)，最多验证3次
   */
  protected checkPhoneCode = async (
    phone: string,
    code: number,
  ): Promise<Status> => {
    const verifyCodeString = await redis.get(phone)
    if (!verifyCodeString) return Status.CODE_NULL
    const [verifyCode, count, endTime] = verifyCodeString.split('$')
    const destroyTime = await redis.ttl(phone)
    redis.set(
      phone,
      `${verifyCode}$${+count + 1}$${endTime}`,
      'EX',
      destroyTime,
    )

    if (+count >= 3) return Status.CODE_MATCH_MUCH
    if (+verifyCode !== code) return Status.CODE_ERROR
    return Status.SUCCESS
  }
}

@Injectable()
export class RegisterService extends PhoneCodeModule {
  constructor(protected readonly userDBService: UserDBService) {
    super()
  }

  /** @info 生成用户uid */
  protected async createUid() {
    let uid = ~~(Math.random() * 900_000_000) + 100_000_000 + ''
    while (await this.userDBService.findOne({ uid })) {
      uid = ~~(Math.random() * 900_000_000) + 100_000_000 + ''
    }
    return uid
  }

  protected async hasRegistered(user: string, phone: string): Promise<Status> {
    const hasUserRegistered = await this.userDBService.findOne({ user })
    if (hasUserRegistered) return Status.USER_EXIST
    const hasPhoneRegistered = await this.userDBService.findOne({ phone })
    if (hasPhoneRegistered) return Status.PHONE_EXIST
    return Status.SUCCESS
  }

  /** @info 数据库新增用户 */
  async addUser(user: string, phone: string, pwd: string): Promise<boolean> {
    const hasRegistered = await this.userDBService.findOne({
      $or: [{ user }, { phone }],
    })
    if (hasRegistered) return false

    const uid = await this.createUid()
    return await this.userDBService.insertOne({
      user,
      phone,
      pwd: hashPassword(pwd),
      uid,
    })
  }

  /** @info 注册 */
  register: Register = async (user, pwd, phone, code) => {
    const hasRegistered = await this.hasRegistered(user, phone)
    if (hasRegistered !== Status.SUCCESS) {
      return defineResponseData(
        hasRegistered === Status.USER_EXIST ? '用户名已被注册' : '手机号已存在',
        hasRegistered,
      )
    }

    const checkRes = await this.checkPhoneCode(phone, code)
    switch (checkRes) {
      case Status.CODE_NULL:
        return defineResponseData('未发送验证码或已过期', Status.CODE_NULL)
      case Status.CODE_MATCH_MUCH:
        return defineResponseData('验证码错误次数过多', Status.CODE_MATCH_MUCH)
      case Status.CODE_ERROR:
        return defineResponseData('验证码错误', Status.CODE_ERROR)
      case Status.SUCCESS:
        return (await this.addUser(user, phone, pwd))
          ? defineResponseData('注册成功', Status.SUCCESS, { user, pwd })
          : defineResponseData('数据库错误', Status.MONGO_INSERT_ERROR)
      default:
        return defineResponseData('未知错误', Status.SERVER_ERROR)
    }
  }

  /**
   * @info 发送验证码
   * @param phone 手机号
   */
  async sendCode(phone: string): Promise<ResponseData> {
    /** @example "123456$2$5641894894" */
    const strings = await redis.get(phone)
    if (strings) {
      const [_verifyCode, _count, endTime] = strings.split('$')
      if (new Date().getTime() < +endTime)
        return defineResponseData('发送过于频繁', Status.SMS_SEND_MUCH)
    }

    const code = this.createCode(phone)
    return (await sendVerifyCode(code, phone))
      ? defineResponseData('发送验证码成功', Status.SUCCESS, { code, phone })
      : defineResponseData('发送验证码失败', Status.SMS_SEND_ERROR)
  }
}
