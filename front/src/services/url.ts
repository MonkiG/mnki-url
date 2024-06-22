import { config } from '../config'
import { type ShortUrlResponse, type InputData } from '../types'

export default async function createShortUrl (data: InputData): Promise<ShortUrlResponse> {
  const response = await fetch(`${config.API_URL}/short`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }) /* eslint-disable-next-line */
  .then(res => res.json())

  return response
}
