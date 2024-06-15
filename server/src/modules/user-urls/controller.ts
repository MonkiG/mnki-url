import { type Response, type Request } from 'express'
import type BaseResourceController from '../../core/lib/BaseResourceController'

class UserLinksController implements BaseResourceController {
  getAll (_: Request, res: Response): void {
    res.json({ message: 'Get user links route' })
  }

  get (_: Request, res: Response): void {
    res.json({ message: 'Get user link route' })
  }

  store (_: Request, res: Response): void {
    res.json({ message: 'Post user link route' })
  }

  edit (_: Request, res: Response): void {
    res.json({ message: 'Edit user link route' })
  }

  delete (_: Request, res: Response): void {
    res.json({ message: 'delete user link route' })
  }
}

export default new UserLinksController()
