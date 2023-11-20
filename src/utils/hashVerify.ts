import { randomBytes, pbkdf2Sync } from 'node:crypto'

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return [salt, hash].join('$')
}

export function validatePassword(password: string, original: string): boolean {
  const originalHash = original.split('$')[1]
  const salt = original.split('$')[0]
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return hash === originalHash
}
