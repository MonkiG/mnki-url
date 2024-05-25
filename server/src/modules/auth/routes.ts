import BaseRouter from './../../core/lib/BaseRouter'
import AuthController from './controller'

export default class AuthRoutes extends BaseRouter {
  constructor () {
    super()

    this.router.post('/login', AuthController.login.bind(AuthController))
    this.router.post('/signup', AuthController.signup.bind(AuthController))
    this.defaultRoutes()
  }
}
