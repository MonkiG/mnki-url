import { pool } from '../../context/context.postgres'
import isValidUrl from '../../core/utils/valid-url'
import { ShortURL, ResponseShortUrlDTO, type ShortURLConstructor } from './models'

export async function createShortUrl (url: string, alias?: string): Promise<ResponseShortUrlDTO> {
  const { data: parseredUrl, error } = isValidUrl(url)
  if (error !== null) {
    throw new Error('The url provided is not a valid url')
  }

  const urlUuid = crypto.randomUUID()
  const urlHash = urlUuid.split('-').slice(-1)[0].slice(-6)
  const shortUrl = new ShortURL({
    id: urlUuid,
    original: parseredUrl!.href,
    hash: urlHash,
    alias
  })

  const { rows: [shortUrlSaved] } = await pool.query(
    'INSERT INTO urls(id, original, hash, alias) VALUES($1, $2, $3, $4)  RETURNING *',
    [shortUrl.id, shortUrl.original, shortUrl.hash, shortUrl.alias !== undefined ? alias : null]
  )

  const responseDto = new ResponseShortUrlDTO({
    ...shortUrlSaved as ShortURLConstructor,
    createdAt: shortUrlSaved.created_at,
    updatedAt: shortUrlSaved.updated_at
  })

  return responseDto
}
