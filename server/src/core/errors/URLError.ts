import ErrorNames from '../enums/ErrorsNames'

export default class URLError extends Error {
  constructor () {
    super()
    this.message = 'No url with the identifier found'
    this.name = ErrorNames.URLError
  }
}
