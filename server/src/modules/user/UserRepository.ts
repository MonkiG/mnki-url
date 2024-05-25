import { type User } from './models'
import { type UUID } from './../../core/types'
import type BaseRepository from './../../core/lib/BaseRepository'

export default class UserRepository implements BaseRepository<User> {
  async create (_data: User): Promise<User> {
    const placeholder: User = {
      id: 'asdf-asdf-asdf-asdf-asdf',
      userName: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date()

    }
    return placeholder
  }

  async get (): Promise<User | null> {
    return null
  }

  async getAll (): Promise<User[]> {
    return []
  }

  async update (_id: UUID, _data: Partial<User>): Promise<User | null> {
    return null
  }

  async delete (_id: UUID): Promise<User | null> {
    return null
  }
}
