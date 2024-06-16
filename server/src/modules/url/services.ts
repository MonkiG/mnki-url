import { pool } from '../../context/context.postgres'
import { type UUID } from '../../core/types'
import { type ShortUrlResponseDto, type ShortUrlRequest, type DbUrlQuery } from './models'

export async function createShortUrl (shortUrlRequest: ShortUrlRequest, userId?: UUID): Promise<ShortUrlResponseDto> {
  const urlUuid = crypto.randomUUID()

  const urlHash = urlUuid.split('-').slice(-1)[0].slice(-6)
  const { rows: [shortUrlSaved] } = await pool.query<DbUrlQuery>(
    'INSERT INTO urls(original, hash, alias, user_id) VALUES($1, $2, $3, $4)  RETURNING *',
    [shortUrlRequest.url.href, urlHash, shortUrlRequest.alias ?? null, userId ?? null]
  )

  return {
    id: shortUrlSaved.id,
    original: shortUrlSaved.original,
    alias: shortUrlSaved.alias,
    hash: shortUrlSaved.hash,
    createdAt: shortUrlSaved.created_at,
    updatedAt: shortUrlSaved.updated_at
  }
}
