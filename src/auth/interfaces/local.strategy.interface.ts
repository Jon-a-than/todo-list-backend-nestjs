import { IUser } from '@/user/interfaces/user.interface'

interface ValidateArgs {
  user: string
  pwd: string
  verifyCode?: string
  uuid?: string
}
type ValidateResult = Promise<{
  error?: unknown
  userInfo?: Omit<IUser, 'pwd'>
}>
type ValidateFunction = (validateArgs: ValidateArgs) => ValidateResult

interface IRequest {
  body: { verifyCode?: string; uuid?: string; [key: string]: any }
}
type VerifyFunctionWithRequest = (
  this: { validate: ValidateFunction },
  req: IRequest,
  user: string,
  pwd: string,
  done: (
    error: any,
    user?: Omit<IUser, 'pwd'> | { verifyCodeSvg: string },
  ) => void,
) => void

export type { VerifyFunctionWithRequest, ValidateFunction }
