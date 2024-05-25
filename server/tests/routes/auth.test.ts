import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import App from '../../src/app'
import request from 'supertest'
import Environment from '../../src/core/enums/environments'
import { HttpResponsesStatuses } from '../../src/core/enums/Responses'
import { pool } from '../../src/context/context.postgres'

describe('Auth routes', () => {
  let app: App
  beforeAll(async () => {
    app = new App({
      port: 3000,
      environment: Environment.LOCAL
    })
    app.start()
    await pool.query('DELETE FROM users WHERE email=\'raan.heam@gmail.com\'')
  })

  afterAll(() => {
    app.getServer().close()
  })

  describe('/signup', () => {
    test('Should return status 201', async () => {
      const response = await request(app.expressApp)
        .post('/auth/signup')
        .set('content-type', 'application/json')
        .send({
          userName: 'MonkiG',
          password: 'password',
          email: 'raan.heam@gmail.com'
        })

      expect(response.status).toBe(HttpResponsesStatuses.CREATED)
    })
  })

  describe('/login', () => {
    test('Should return status 200', async () => {
      const response = await request(app.expressApp)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({
          identifier: 'MonkiG',
          password: 'password'
        })

      expect(response.status).toBe(200)
    })
  })
})
