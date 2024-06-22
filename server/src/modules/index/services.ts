import { pool } from '../../context/context.postgres'
import URLError from '../../core/errors/URLError'

export async function getOriginalUrl (identifier: string): Promise<URL> {
  const { rows: [selectedUrl] } = await pool.query('SELECT * FROM urls WHERE hash=$1 OR alias=$1', [identifier])

  if (!selectedUrl) {
    throw new URLError()
  }
  return new URL(selectedUrl.original as string)
}
