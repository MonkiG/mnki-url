import BaseRouter from './../../core/lib/BaseRouter'
import { getOriginalUrl } from './services'

export default class MainRouter extends BaseRouter {
  constructor () {
    super()
    // this.router.get('/', (_, res) => {
    //   res.json({ message: 'Hello, world!' })
    // })
    this.router.get('/hello-world', (_, res) => {
      res.json({ message: 'Hello, world!' })
    })
    this.router.get('/:identifier', async (req, res) => {
      const { params } = req
      const { identifier } = params

      const originalUrl = await getOriginalUrl(identifier)
      res.redirect(originalUrl.href)
    })
    this.defaultRoutes()
  }
}
