import { pool } from '../../context/context.postgres'
import { type UUID } from '../../core/types'
import { type ShortUrlResponseDto, type ShortUrlRequest, type DbUrlQuery } from './models'

export async function shortUrlExists (alias: string): Promise<boolean> {
  const { rows: [shortUrl] } = await pool.query('SELECT * FROM urls WHERE alias = $1', [alias])

  const urlExists = Boolean(shortUrl)
  return urlExists
}

export async function userShortUrlExists (alias: string, userId: UUID): Promise<boolean> {
  const { rows: [shortUrl] } = await pool.query('SELECT * FROM urls WHERE alias = $1 AND user_id = $2', [alias, userId])
  return Boolean(shortUrl)
}

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
    serverUrl: shortUrlRequest.serverUrl,
    alias: shortUrlSaved.alias,
    hash: shortUrlSaved.hash,
    createdAt: shortUrlSaved.created_at,
    updatedAt: shortUrlSaved.updated_at
  }
}
