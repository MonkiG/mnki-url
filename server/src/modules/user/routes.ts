import UserController from './controller'
import BaseRouter from './../../core/lib/BaseRouter'

export default class UserRouter extends BaseRouter {
  constructor () {
    super()
    this.resource(UserController)
    this.defaultRoutes()
  }

  static router = new UserRouter().router
}
