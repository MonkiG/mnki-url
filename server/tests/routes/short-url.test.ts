import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { type Server } from 'node:http'
import App from '../../src/app'
import Environment from '../../src/core/enums/environments'

describe.skip('Short url test', () => {
  let app: App
  let server: Server
  beforeAll(() => {
    app = new App({ port: 3000, environment: Environment.DEVELOPMENT })
    app.start()
    server = app.getServer()
  })

  afterAll(() => {
    server.close()
  })

  describe('/short', () => {
    test('Should return status 201', async () => {
      const response = await request(app.expressApp)
        .post('/short')
        .send({

        })

      expect(response.status).toBe('201')
    })

    test('Should return the url shorted', async () => {
      const response = await request(app.expressApp)
        .post('/short')
        .send({

        })

      // obtener la url acortada
      expect(response.body.short).toBe('')
    })
  })

  describe('/short/:id', () => {
    test('Should return stauts 302', async () => {
      const response = await request(app.expressApp)
        .get('/short/1')
        .send({

        })

      expect(response.status).toBe('201')
    })

    test('Should have the original url', async () => {
      const response = await request(app.expressApp)
        .get('/short/1')
        .send({

        })

      expect(response.header.location).toBe('')
    })
  })
})
