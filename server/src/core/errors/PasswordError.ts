import ErrorNames from '../enums/ErrorsNames'

export default class PasswordError extends Error {
  constructor () {
    super()
    this.name = ErrorNames.PasswordError
    this.message = 'Incorrect password'
  }
}
