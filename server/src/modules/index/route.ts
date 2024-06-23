import ErrorNames from '../../core/enums/ErrorsNames'
import { HttpResponsesStatuses } from '../../core/enums/Responses'
import BaseRouter from './../../core/lib/BaseRouter'
import { getOriginalUrl } from './services'

export default class MainRouter extends BaseRouter {
  constructor () {
    super()
    this.router.get('/hello-world', (_, res) => {
      res.json({ message: 'Hello, world!' })
    })
    this.router.get('/:identifier', async (req, res) => {
      const { params } = req
      const { identifier } = params

      try {
        const originalUrl = await getOriginalUrl(identifier)
        res.redirect(originalUrl.href)
      } catch (e: any) {
        if (e.name === ErrorNames.URLError) {
          res.status(HttpResponsesStatuses.NOT_FOUND).json({ message: 'Url don\'t found' })
        }
      }
    })
    this.defaultRoutes()
  }
}
