import { type SignUpDbRespose, type LoginDto, type SignUpDto } from './models'
import PrimitivesValidators from './../../core/lib/PrimitivesValidators'
import { type UUID } from '../../core/types'

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

  toSignUpDbRespose (data: any): SignUpDbRespose {
    return {
      id: data.id as UUID,
      userName: data.user_name,
      email: data.email,
      password: data.password,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }
}
