import { type Response, type Request } from 'express'
import type BaseResourceController from './../../core/lib/BaseResourceController'

class UserController implements BaseResourceController {
  get (_: Request, res: Response): void {
    res.json({ message: 'Get user route' })
  }

  store (_: Request, res: Response): void {
    res.json({ message: 'Post user route' })
  }

  edit (_: Request, res: Response): void {
    res.json({ message: 'Edit user route' })
  }

  delete (_: Request, res: Response): void {
    res.json({ message: 'delete user route' })
  }
}

export default new UserController()
