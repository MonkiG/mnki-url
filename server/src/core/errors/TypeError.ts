import ErrorNames from '../enums/ErrorsNames'

export default class TypeError extends Error {
  constructor (message: string) {
    super()
    this.name = ErrorNames.TypeError
    this.message = message
    this.cause = 'Invalid type'
  }
}
