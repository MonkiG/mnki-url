export default class TypeError extends Error {
  constructor (message: string) {
    super()
    this.name = 'Type error'
    this.message = message
    this.cause = 'Invalid type'
  }
}
