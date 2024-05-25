import UserLinksController from './controller'
import BaseRouter from './../../core/lib/BaseRouter'

export default class UserLinksRouter extends BaseRouter {
  constructor () {
    super()
    this.resource(UserLinksController)
    this.router.get('/', UserLinksController.getAll.bind(UserLinksController))
    this.defaultRoutes()
  }
}
