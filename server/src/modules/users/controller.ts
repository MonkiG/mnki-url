import { type Request, type Response } from 'express'

class UsersController {
  get (_: Request, res: Response): void {
    res.json({ message: 'Aqui se obtiene la informacion de todos mis usuarios' })
  }
}

export default new UsersController()
