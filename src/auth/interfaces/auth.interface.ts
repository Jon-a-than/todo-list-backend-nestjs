import { IUser, IUserDB } from '@/user/interfaces/user.interface'

type ValidateUser = (
  user: string,
  pwd: string,
) => Promise<Omit<IUser, 'pwd'> | null>

type Login = (userInfo: Omit<IUserDB, 'pwd'>) => { access_token: string }

export { ValidateUser, Login }
