import { Types } from 'mongoose'

export function filterDocument<T>(
  document: T,
): Omit<T, '_id' | '__v'> & { id: string } {
  const { _id, __v, ...omittedDoc } = document as unknown as T & {
    _id: Types.ObjectId
    __v: number
  }

  return {
    id: _id as unknown as string,
    ...omittedDoc,
  }
}
