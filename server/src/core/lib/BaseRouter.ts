import { Router } from 'express'
import type BaseResourceController from './BaseResourceController'

export default abstract class BaseRouter {
  router: Router = Router({ mergeParams: true })

  protected defaultRoutes (): void {
    this.router.all('*', (_, res) => {
      res.json({ message: 'Route not allowed' })
    })
  }

  protected resource (
    controllerClass: BaseResourceController,
    paramName?: string
  ): void {
    this.router.get(`/:${paramName}` ?? '/:id', controllerClass.get)
    this.router.post('/', controllerClass.store)
    this.router.patch(`/:${paramName}` ?? '/:id', controllerClass.edit)
    this.router.put(`/:${paramName}` ?? '/:id', controllerClass.edit)
    this.router.delete(`/:${paramName}` ?? '/:id', controllerClass.delete)
  }
}
