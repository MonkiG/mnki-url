import { type Request, type Response } from 'express'
import * as ShorUrlServices from './services'
import { ShortUrlRequest } from './models'
import { HttpResponsesStatuses } from '../../core/enums/Responses'
import ErrorNames from '../../core/enums/ErrorsNames'

class ShortUrl {
  services = ShorUrlServices
  async create (req: Request, res: Response): Promise<void> {
    const { body } = req
    const serverUrl = `${req.protocol}://${req.get('host')}/`
    body.serverUrl = serverUrl
    try {
      const requestShortURl = new ShortUrlRequest(body)
      const urlResponse = await this.services.createShortUrl(requestShortURl)
      res.status(201).json(urlResponse)
    } catch (e: any) {
      if (e.name === ErrorNames.InvalidURLError) {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Invalid url format' })
        return
      }
      res.status(HttpResponsesStatuses.ERROR).json({ message: 'Server error' })
    }
  }
}

export default new ShortUrl()
