import { type UUID } from './../types'

export default interface BaseRepository<T> {
  create: (data: T) => Promise<T>
  get: () => Promise<T | null>
  getAll: () => Promise<T[]>
  update: (id: UUID, data: Partial<T>) => Promise<T | null>
  delete: (id: UUID) => Promise<T | null>
}
