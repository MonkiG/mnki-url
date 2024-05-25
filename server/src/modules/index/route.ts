import BaseRouter from './../../core/lib/BaseRouter'

export default class MainRouter extends BaseRouter {
  constructor () {
    super()
    this.router.get('/', (_, res) => {
      res.json({ message: 'Hello, world!' })
    })
    this.defaultRoutes()
  }
}
