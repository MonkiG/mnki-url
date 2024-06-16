import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import App from './../../src/app'
import { type Server } from 'node:http'
import Environment from '../../src/core/enums/environments'
import { HttpResponsesStatuses } from '../../src/core/enums/Responses'
import { pool } from '../../src/context/context.postgres'
import { type DbAuthQuery } from '../../src/modules/auth/models'

describe('User routes', () => {
  let app: App
  let server: Server
  let user: DbAuthQuery
  beforeAll(async () => {
    app = new App({ port: 3004, environment: Environment.LOCAL })
    app.start()
    server = app.getServer()
    const { rows: [data] } = await pool.query<DbAuthQuery>('INSERT INTO users(user_name, email, password) VALUES (\'MonkiG\',\'some@email.com\',\'password\') RETURNING *')
    user = data
  })

  afterAll(async () => {
    server.close()
    await pool.query('DELETE FROM users WHERE id=$1', [user.id])
  })
  describe('/user', () => {
    test('Should return status 200 /', async () => {
      const response = await request(app.expressApp)
        .get(`/user/${user.id}`)

      expect(response.status).toBe(HttpResponsesStatuses.OK)
    })
    test('Should have an id defined', async () => {
      const response = await request(app.expressApp)
        .get(`/user/${user.id}`)

      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toBeDefined()
    })

    test('Should return status 204', async () => {
      const response = await request(app.expressApp)
        .patch(`/user/${user.id}`)
        .set('content-type', 'application/json')
        .send({
          userName: 'MonkiG13',
          password: 'somepassword'
        })

      expect(response.status).toBe(HttpResponsesStatuses.NO_CONTENT)
    })

    test('Should return status 204', async () => {
      const response = await request(app.expressApp)
        .delete(`/user/${user.id}`)

      expect(response.status).toBe(HttpResponsesStatuses.NO_CONTENT)
    })
  })
})
