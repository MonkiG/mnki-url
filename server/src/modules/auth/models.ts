export interface LoginDto {
  identifier: string // Puede ser email o username
  password: string
}

export interface AuthResponseDto {
  userName: string
  email: string
  token: string
}
export interface SignUpDto {
  userName: string
  email: string
  password: string
}

export default class AuthResponse implements AuthResponseDto {
  userName: string
  email: string
  token: string
  constructor ({
    userName,
    email,
    token
  }: AuthResponseDto) {
    this.userName = userName
    this.email = email
    this.token = token
  }
}
