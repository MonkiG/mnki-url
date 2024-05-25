import jwt from 'jsonwebtoken'
import Config from './config'
import { type UUID } from './types'

export function signToken (userId: UUID, userEmail: string, userName: string): string {
  const payload = {
    sub: 'authpayload',
    iss: Config.DOMAIN,
    aud: ['web', 'mobile'],
    jti: crypto.randomUUID(),
    iat: Math.floor(Date.now() / 1000),
    context: {
      user: {
        id: userId,
        email: userEmail,
        userName
      }

    }
  }

  return jwt.sign(payload, Config.JWT_KEY, { expiresIn: '4w' })
}

export function verifyToken (): void {

}
