import { Router } from 'express'
import type BaseResourceController from './BaseResourceController'

export default abstract class BaseRouter {
  router: Router = Router()

  protected defaultRoutes (): void {
    this.router.all('*', (_, res) => {
      res.json({ message: 'Route not allowed' })
    })
  }

  protected resource (
    controllerClass: BaseResourceController
  ): void {
    this.router.get('/:id', controllerClass.get)
    this.router.post('/', controllerClass.store)
    this.router.patch('/:id', controllerClass.edit)
    this.router.put('/:id', controllerClass.edit)
    this.router.delete('/:id', controllerClass.delete)
  }
}
