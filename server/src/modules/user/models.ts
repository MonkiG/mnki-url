import { type UUID } from './../../core/types'

export interface User {
  id: UUID
  userName: string
  email: string
  createdAt: Date
  updatedAt: Date
}
