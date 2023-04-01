import { v4 as uuidV4 } from 'uuid'

export function getUuid(): string {
  return uuidV4()
}
