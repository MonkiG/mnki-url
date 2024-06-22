import { type Request, type Response } from 'express'
import * as ShorUrlServices from './services'
import { ShortUrlRequest } from './models'
import { HttpResponsesStatuses } from '../../core/enums/Responses'

class ShortUrl {
  services = ShorUrlServices
  async create (req: Request, res: Response): Promise<void> {
    const { body } = req
    const serverUrl = `${req.protocol}://${req.get('host')}/`

    try {
      const requestShortURl = new ShortUrlRequest(body)
      requestShortURl.serverUrl = serverUrl
      const urlResponse = await this.services.createShortUrl(requestShortURl)
      res.status(201).json(urlResponse)
    } catch (e: any) {
      if (e.name === 'InvalidUrl') {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Invalid url format' })
        return
      }
      res.status(HttpResponsesStatuses.ERROR).json({ message: 'Server error' })
    }
  }
}

export default new ShortUrl()
