import { type Request, type Response } from 'express'

class ShortUrl {
  create (_: Request, res: Response): void {
    res.json({ message: 'Aqui se enviara el link acortado para guardarlo en la db y retornara el link acortado' })
  }

  get (_: Request, res: Response): void {
    res.json({ message: 'Aqui se redirigira a la ruta horiginal' })
  }
}

export default new ShortUrl()
