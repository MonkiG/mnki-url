import { pool } from '../../context/context.postgres'

export async function getOriginalUrl (identifier: string): Promise<URL> {
  const { rows: [selectedUrl] } = await pool.query('SELECT * FROM urls WHERE hash=$1 OR alias=$1', [identifier])

  if (!selectedUrl) {
    const urlError = new Error('No url with the identifier found')
    urlError.name = 'urlError'
    throw urlError
  }
  return new URL(selectedUrl.original as string)
}
