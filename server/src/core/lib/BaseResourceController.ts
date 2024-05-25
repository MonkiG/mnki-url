import { type RequestHandler } from 'express'

export default interface BaseResourceController {
  get: RequestHandler
  store: RequestHandler
  edit: RequestHandler
  delete: RequestHandler
}
