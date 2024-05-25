import { type LoginDto, type SignUpDto } from './models'
import PrimitivesValidators from './../../core/lib/PrimitivesValidators'

export default class AuthValidators extends PrimitivesValidators {
  toLoginDto (data: any): LoginDto {
    return {
      identifier: AuthValidators.isString(data.identifier),
      password: AuthValidators.isString(data.password)
    }
  }

  toSignUpDto (data: any): SignUpDto {
    return {
      userName: AuthValidators.isString(data.userName),
      email: AuthValidators.isString(data.email),
      password: AuthValidators.isString(data.password)
    }
  }
}
