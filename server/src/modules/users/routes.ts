import UsersController from './controller'
import BaseRouter from './../../core/lib/BaseRouter'

export default class UsersRouter extends BaseRouter {
  constructor () {
    super()
    this.router.get('/', UsersController.get.bind(UsersController))
    this.defaultRoutes()
  }
}
