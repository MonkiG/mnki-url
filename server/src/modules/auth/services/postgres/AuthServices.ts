import AuthResponse, { type SignUpDto, type AuthResponseDto, type LoginDto } from './../../models'
import { pool } from './../../../../context/context.postgres'
export default class AuthServices {
  async logIn (data: LoginDto): Promise<AuthResponseDto> {
    console.log(data)
    return new AuthResponse({ userName: 'test', email: 'test', token: 'test' })
  }

  async signUp (data: SignUpDto): Promise<AuthResponseDto | null> {
    const isRegistered = await this.isRegistered(data.email ?? data.userName)
    if (isRegistered) return null

    // Hash password
    const { rows: [dataSelected] } = await pool.query('INSERT INTO users(user_name, email, password) VALUES ($1,$2,$3) RETURNING *', ['MonkiG', 'raan.heam@gmail.com', 'RAHA1234'])
    // Hacer el token
    const auth = new AuthResponse({ userName: dataSelected.user_name, email: dataSelected.email, token: '' })
    return auth
  }

  async isRegistered (identifier: string): Promise<boolean> {
    const query = await pool.query('SELECT * FROM users WHERE user_name = $1 OR email = $1', [identifier])

    return query.rowCount! > 0
  }

  logOut (): boolean {
    return true
  }
}
