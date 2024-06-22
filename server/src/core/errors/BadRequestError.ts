import ErrorNames from '../enums/ErrorsNames'

export default class BadRequestError extends Error {
  constructor () {
    super()
    this.message = 'Required data don\'t provided'
    this.name = ErrorNames.BadRequestError
  }
}
