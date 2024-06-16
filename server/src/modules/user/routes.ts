import UserController from './controller'
import BaseRouter from './../../core/lib/BaseRouter'

export default class UserRouter extends BaseRouter {
  constructor () {
    super()
    this.router.get('/:id', UserController.get.bind(UserController))
    this.router.patch('/:id', UserController.edit.bind(UserController))
    this.router.delete('/:id', UserController.delete.bind(UserController))
    this.defaultRoutes()
  }
}
