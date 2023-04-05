import { IUserDB } from '@/user/interfaces/user.interface'

export const enum Status {
  /** 成功 */
  SUCCESS = 20000,
  /** 参数缺失 */
  PARAM_LESS = 40000,
  /** 参数错误 */
  PARAM_ERROR = 40001,
  /** 未发送过验证码或验证码已过期 */
  CODE_NULL = 40002,
  /** 验证码错误次数过多 */
  CODE_MATCH_MUCH = 40003,
  /** 验证码已超时 */
  CODE_TIMEOUT = 40004,
  /** 验证码错误 */
  CODE_ERROR = 40005,
  /** 用户名已存在 */
  USER_EXIST = 40006,
  /** 手机号已存在 */
  PHONE_EXIST = 40007,
  /** 短信发送过于频繁 */
  SMS_SEND_MUCH = 40008,
  /** 服务器错误 */
  SERVER_ERROR = 50000,
  /** MongoDB 数据插入失败 */
  MONGO_INSERT_ERROR = 50001,
  /** MongoDB 用户/手机号已存在 */
  MONGO_USER_EXIST = 50002,
  /** 短信发送失败 */
  SMS_SEND_ERROR = 50003,
}

export interface ResponseData {
  message: string
  data?: { [key: string]: any }
  status: Status
}

export const defineResponseData = (
  message: string,
  status: Status = Status.SUCCESS,
  data: { [key: string]: any } = {},
): ResponseData => {
  return {
    message,
    data,
    status,
  }
}

export interface JwtRequestPayload {
  user: Omit<IUserDB, 'pwd' | '_id'>
}
