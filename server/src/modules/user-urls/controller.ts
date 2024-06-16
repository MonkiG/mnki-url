import { type Response, type Request } from 'express'
import type BaseResourceController from '../../core/lib/BaseResourceController'
import { pool } from '../../context/context.postgres'
import { createShortUrl } from '../url/services'
import { ShortUrlRequest } from '../url/models'
import { type UUID } from '../../core/types'

class UserLinksController implements BaseResourceController {
  async getAll (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { rows } = await pool.query(`
        SELECT id, original, hash, alias, created_at, updated_at
        FROM urls
        WHERE user_id = $1
      `, [id])

    const urlsParsed = rows.map(x => {
      /* eslint-disable-next-line */
      const { created_at, updated_at, ...rest } = x
      return {
        ...rest,
        createdAt: x.created_at,
        updatedAt: x.updated_at
      }
    })

    res.status(200).json(urlsParsed)
  }

  async get (req: Request, res: Response): Promise<void> {
    const { id, urlId } = req.params
    const { rows: [data] } = await pool.query(`
        SELECT id, original, hash, alias, created_at, updated_at
        FROM urls
        WHERE user_id = $1 AND id = $2
      `, [id, urlId])

    if (!data) {
      res.status(404).json({ message: 'Url don\'t found' })
      return
    }
    /* eslint-disable-next-line */
    const { created_at, updated_at, ...rest } = data
    const urlParsed = {
      ...rest,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }

    res.status(200).json(urlParsed)
  }

  async store (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { body } = req
    const requestShortURl = new ShortUrlRequest(body)
    if (!id) return
    const shortUrl = await createShortUrl(requestShortURl, id as UUID)
    res.status(201).json(shortUrl)
  }

  async edit (req: Request, res: Response): Promise<void> {
    const { id, urlId } = req.params
    const { body } = req
    // Construir dinámicamente la consulta de actualización
    const setClauses: string[] = []
    const values: any[] = []

    Object.keys(body as Record<string, string>).forEach((key, index) => {
      setClauses.push(`${key} = $${index + 1}`)

      values.push(body[key as keyof typeof body])
    })

    setClauses.push(`updated_at = $${values.length + 1}`)
    values.push(new Date())

    const query = `UPDATE urls SET ${setClauses.join(', ')} WHERE id = $${values.length + 1} AND user_id = $${values.length + 2} RETURNING *`
    values.push(urlId)
    values.push(id)

    const { rows: [data] } = await pool.query(query, values)
    if (!data) {
      res.status(404).json({ message: 'URL not found' })
      return
    }

    /* eslint-disable-next-line */
    const { created_at, updated_at, ...rest } = data
    const urlParsed = {
      ...rest,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
    res.status(200).json(urlParsed)
  }

  async delete (req: Request, res: Response): Promise<void> {
    const { id, urlId } = req.params

    await pool.query(`
      DELETE FROM urls
      WHERE user_id  = $1 AND id = $2

    `, [id, urlId])
    res.status(204).send()
  }
}

export default new UserLinksController()
