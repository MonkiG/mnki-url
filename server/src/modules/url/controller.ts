import { type Request, type Response } from 'express'
import * as ShorUrlServices from './services'
import { RequestShorURL } from './models'

class ShortUrl {
  services = ShorUrlServices
  async create (req: Request, res: Response): Promise<void> {
    const { body } = req
    const requestShortURl = new RequestShorURL(body)
    const urlResponse = await this.services.createShortUrl(requestShortURl.url, requestShortURl.alias)

    res.status(201).json(urlResponse)
  }
}

export default new ShortUrl()
