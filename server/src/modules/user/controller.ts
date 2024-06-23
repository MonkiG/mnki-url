import { type Response, type Request } from 'express'
import { HttpResponsesStatuses } from '../../core/enums/Responses'
import { pool } from '../../context/context.postgres'
import { isPartialUser, type BdUserQuery } from './models'
import bcrypt from 'bcrypt'

class UserController {
  async get (req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const { rows: [user] } = await pool.query<BdUserQuery>('Select id, user_name, email, created_at, updated_at FROM users WHERE id=$1', [id])

    res.status(HttpResponsesStatuses.OK).json({
      id: user.id,
      userName: user.user_name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    })
  }

  async edit (req: Request, res: Response): Promise<void> {
    const dictionary: Record<string, string> = {
      userName: 'user_name',
      email: 'email',
      password: 'password'
    }
    const { id } = req.params
    const { body } = req

    if (!isPartialUser(body)) {
      res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'The body of the request should be a Partial of User' })
      return
    }

    // Construir dinámicamente la consulta de actualización
    const setClauses: string[] = []
    const values: any[] = []

    Object.keys(body).forEach((key, index) => {
      const dbColumn = dictionary[key]
      if (dbColumn) {
        setClauses.push(`${dbColumn} = $${index + 1}`)
        if (dbColumn === 'password') {
          values.push(bcrypt.hashSync(body[key as keyof typeof body] as string, 10))
        } else {
          values.push(body[key as keyof typeof body])
        }
      }
    })

    setClauses.push(`updated_at = $${values.length + 1}`)
    values.push(new Date())

    const query = `UPDATE users SET ${setClauses.join(', ')} WHERE id = $${values.length + 1} RETURNING *`
    values.push(id)

    try {
      await pool.query(query, values)
      res.status(HttpResponsesStatuses.NO_CONTENT).send()
    } catch (error) {
      res.status(HttpResponsesStatuses.ERROR).json({ message: 'Internal server error' })
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    const { id } = req.params

    await pool.query('DELETE FROM users WHERE id=$1', [id])
    res.status(HttpResponsesStatuses.NO_CONTENT).send()
  }
}

export default new UserController()
