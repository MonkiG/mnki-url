import ErrorNames from '../enums/ErrorsNames'

export default class InvalidURLError extends Error {
  constructor () {
    super()
    this.name = ErrorNames.InvalidURLError
    this.message = 'Invalid url'
  }
}
