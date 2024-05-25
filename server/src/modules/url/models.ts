import { type UUID } from './../../core/types'

export interface Link {
  id: UUID
  original: string
  alias: string
  createdAt: Date
  updatedAt: Date
}
