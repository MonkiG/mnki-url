import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { type Server } from 'node:http'
import App from '../../src/app'
import Environment from '../../src/core/enums/environments'
import { pool } from '../../src/context/context.postgres'

describe('Short url test', () => {
  let app: App
  let server: Server
  const url = 'https://monki-portfolio.vercel.app'
  beforeAll(async () => {
    app = new App({ port: 3002, environment: Environment.DEVELOPMENT })
    app.start()
    server = app.getServer()
    await pool.query('DELETE FROM urls WHERE original=$1', [url])
  })

  afterAll(() => {
    server.close()
  })

  describe('/short', () => {
    test('Should return status 201', async () => {
      const response = await request(app.expressApp)
        .post('/short')
        .send({
          url
        })

      expect(response.status).toBe(201)
    })
  })
})
