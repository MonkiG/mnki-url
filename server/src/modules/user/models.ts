import { type UUID } from './../../core/types'

export interface BdUserQuery {
  id: string
  user_name: string
  email: string
  created_at: string
  updated_at: string
}
export interface User {
  id: UUID
  userName: string
  email: string
  createdAt: Date
  updatedAt: Date
}

const PartialUserObject: User = {
  id: crypto.randomUUID(),
  userName: '',
  email: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

export function isPartialUser (data: unknown): data is Partial<User> {
  const userKeys = Object.keys(PartialUserObject) as Array<keyof User>

  if (typeof data !== 'object' || data === null) {
    return false
  }

  const dataObj = data as Record<string, unknown>
  const dataKeys = Object.keys(dataObj)

  return dataKeys.some(key => userKeys.includes(key as keyof User))
}
