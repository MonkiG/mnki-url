import { type LoginResponseDto, type LoginRequestDto, type DbAuthQuery, type SignUpResponseDto, type SignUpRequestDto } from './../../models'
import { pool } from './../../../../context/context.postgres'
import { signToken } from '../../../../core/Jwt'
import bcrypt from 'bcrypt'

export default class AuthServices {
  async logIn (data: LoginRequestDto): Promise<LoginResponseDto | null> {
    const [, loginData] = await this.isRegistered<DbAuthQuery>(data.identifier)
    if (!loginData) {
      return null
    }

    const isSamePassword = await bcrypt.compare(data.password, loginData.password)

    if (!isSamePassword) {
      const passwordError = new Error('Incorrect password')
      passwordError.name = 'PasswordError'
      throw passwordError
    }

    const token = signToken(loginData.id, loginData.email, loginData.user_name)

    return {
      id: loginData.id,
      userName: loginData.user_name,
      email: loginData.email,
      createdAt: loginData.created_at,
      updatedAt: loginData.updated_at,
      token
    }
  }

  async signUp (data: SignUpRequestDto): Promise<SignUpResponseDto | null> {
    const [isRegistered] = await this.isRegistered(data.email ?? data.userName)
    if (isRegistered) return null

    const passwordHashed = await bcrypt.hash(data.password, 10)
    const { rows: [dataSelected] } = await pool.query<DbAuthQuery>('INSERT INTO users(user_name, email, password) VALUES ($1,$2,$3) RETURNING *', [data.userName, data.email, passwordHashed])

    const token = signToken(dataSelected.id, dataSelected.email, dataSelected.user_name)

    return {
      id: dataSelected.id,
      userName: dataSelected.user_name,
      email: dataSelected.email,
      createdAt: dataSelected.created_at,
      updatedAt: dataSelected.updated_at,
      token
    }
  }

  async isRegistered <T>(identifier: string): Promise<[boolean, T | null]> {
    const query = await pool.query('SELECT id, user_name, password, email, created_at, updated_at FROM users WHERE user_name = $1 OR email = $1', [identifier])

    return [query.rowCount! > 0, query.rows[0] || null]
  }

  logOut (): boolean {
    return true
  }
}
