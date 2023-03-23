import * as crypto from 'crypto'

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  return [salt, hash].join('$')
}

export function validatePassword(password: string, original: string): boolean {
  const originalHash = original.split('$')[1]
  const salt = original.split('$')[0]
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  return hash === originalHash
}
