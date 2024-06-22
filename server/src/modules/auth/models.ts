import BadRequestError from '../../core/errors/BadRequestError'
import PrimitivesValidators from '../../core/lib/PrimitivesValidators'
import { type UUID } from '../../core/types'

export interface LoginRequestDto {
  identifier: string
  password: string
}

export interface SignUpRequestDto {
  userName: string
  email: string
  password: string
}

interface AuthResponseDto {
  id: UUID
  userName: string
  email: string
  createdAt: Date
  updatedAt: Date
  token: string
}
export interface LoginResponseDto extends AuthResponseDto {}
export interface SignUpResponseDto extends AuthResponseDto {}

export interface DbAuthQuery {
  id: UUID
  user_name: string
  email: string
  created_at: Date
  updated_at: Date
  password: string
}

export class LoginRequest implements LoginRequestDto {
  identifier: string
  password: string
  constructor ({ identifier, password }: any) {
    if (!identifier || !password) {
      throw new BadRequestError()
    }
    this.identifier = PrimitivesValidators.isString(identifier)
    this.password = PrimitivesValidators.isString(password)
  }
}

export class SignUpRequest implements SignUpRequestDto {
  userName: string
  email: string
  password: string
  constructor ({ userName, email, password }: any) {
    if (!userName || !email || !password) {
      throw new BadRequestError()
    }
    this.userName = PrimitivesValidators.isString(userName)
    this.email = PrimitivesValidators.isString(email)
    this.password = PrimitivesValidators.isString(password)
  }
}
