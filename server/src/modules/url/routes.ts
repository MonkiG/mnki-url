import ShortUrlController from './controller'
import BaseRouter from './../../core/lib/BaseRouter'

export default class UrlRouter extends BaseRouter {
  constructor () {
    super()
    this.router.post('/', ShortUrlController.create.bind(ShortUrlController))
    this.router.get('/:id', ShortUrlController.get.bind(ShortUrlController))

    this.defaultRoutes()
  }
}
