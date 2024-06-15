import AuthResponse, { type SignUpDto, type AuthResponseDto, type LoginDto } from './../../models'
import { pool } from './../../../../context/context.postgres'
import { signToken } from '../../../../core/Jwt'
import { type UUID } from '../../../../core/types'
import AuthValidators from '../../validator'
import bcrypt from 'bcrypt'

export default class AuthServices {
  validator = new AuthValidators()
  async logIn (data: LoginDto): Promise<{
    id: UUID
    userName: string
    email: string
    createdAt: Date
    updatedAt: Date
    token: string
  } | null> {
    const [isRegistered, loginData] = await this.isRegistered<{
      id: UUID
      user_name: string
      email: string
      created_at: Date
      updated_at: Date
      password: string
    }>(data.identifier)
    if (!isRegistered) {
      return null
    }

    const isSamePassword = await bcrypt.compare(data.password, loginData!.password)
    if (!isSamePassword) {
      const passwordError = new Error('Incorrect password')
      passwordError.name = 'password error'
      throw passwordError
    }

    const token = signToken(loginData!.id, loginData!.email, loginData!.user_name)

    return {
      id: loginData!.id,
      userName: loginData!.user_name,
      email: loginData!.email,
      createdAt: loginData!.created_at,
      updatedAt: loginData!.updated_at,
      token
    }
  }

  async signUp (data: SignUpDto): Promise<AuthResponseDto | null> {
    const [isRegistered] = await this.isRegistered(data.email ?? data.userName)
    if (isRegistered) return null

    // Hash password
    const passwordHashed = await bcrypt.hash(data.password, 10)
    const { rows: [dataSelected] } = await pool.query('INSERT INTO users(user_name, email, password) VALUES ($1,$2,$3) RETURNING *', [data.userName, data.email, passwordHashed])
    const dataParsered = this.validator.toSignUpDbRespose(dataSelected)
    const token = signToken(dataSelected.id as UUID, dataParsered.email, dataParsered.userName)
    const auth = new AuthResponse({ userName: dataParsered.userName, email: dataParsered.email, token })
    return auth
  }

  async isRegistered <T>(identifier: string): Promise<[boolean, T | null]> {
    const query = await pool.query('SELECT * FROM users WHERE user_name = $1 OR email = $1', [identifier])

    return [query.rowCount! > 0, query.rows[0] || null]
  }

  logOut (): boolean {
    return true
  }
}
