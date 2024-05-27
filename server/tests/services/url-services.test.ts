import { beforeAll, describe, expect, test } from 'vitest'
import { createShortUrl } from '../../src/modules/url/services'
import { ResponseShortUrlDTO } from '../../src/modules/url/models'
import { pool } from '../../src/context/context.postgres'
describe('Url services tests', () => {
  const url = 'https://monki-portfolio.vercel.app/'
  beforeAll(async () => {
    await pool.query('DELETE FROM urls WHERE original=$1', [url])
  })
  test('Create URL', async () => {
    const newUrl = await createShortUrl(url)
    expect(newUrl instanceof ResponseShortUrlDTO).toBe(true)
  })
})
