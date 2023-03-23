export interface RegisterInfo {
  user: string
  pwd1: string
  pwd2: string
  phone: string
  code: number
}

export interface UserInfo {
  user: string
  pwd: string
  phone: string
  uid: string
}

export interface UserDBInfo extends UserInfo {
  _id: unknown
}
