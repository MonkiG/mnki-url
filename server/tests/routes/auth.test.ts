import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import App from '../../src/app'
import request from 'supertest'
import Environment from '../../src/core/enums/environments'
import { HttpResponsesStatuses } from '../../src/core/enums/Responses'
import { pool } from '../../src/context/context.postgres'
import Config from '../../src/core/config'

describe('Auth routes', () => {
  let app: App
  beforeAll(async () => {
    app = new App({
      port: 3003,
      environment: Environment.LOCAL
    })
    app.start()
    await pool.query(`DELETE FROM users WHERE email='${Config.TEST_EMAIL}'`)
  })

  afterAll(async () => {
    app.getServer().close()
    await pool.query(`DELETE FROM users WHERE email='${Config.TEST_EMAIL}'`)
  })

  describe('/signup', () => {
    test('Should return status 201', async () => {
      const response = await request(app.expressApp)
        .post('/auth/signup')
        .set('content-type', 'application/json')
        .send({
          userName: 'MonkiG',
          password: 'password',
          email: Config.TEST_EMAIL
        })

      expect(response.status).toBe(HttpResponsesStatuses.CREATED)
    })

    test('Should return status 409', async () => {
      const response = await request(app.expressApp)
        .post('/auth/signup')
        .set('content-type', 'application/json')
        .send({
          userName: 'MonkiG',
          password: 'password',
          email: Config.TEST_EMAIL
        })

      expect(response.status).toBe(409)
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

  test('Should return status 401', async () => {
    const response = await request(app.expressApp)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({
        identifier: 'MonkiG',
        password: 'Some bad password'
      })

    expect(response.status).toBe(401)
  })
})
