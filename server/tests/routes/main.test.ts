import { type Server } from 'node:http'

import request from 'supertest'

import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import App from '../../src/app'
import Environment from '../../src/core/enums/environments'

describe('Main routes tests ("/")', () => {
  let app: App
  let server: Server
  const url = 'https://monki-portfolio.vercel.app'
  let shortenedUrl
  beforeAll((async () => {
    app = new App({
      port: 3000,
      environment: Environment.LOCAL
    })
    app.start()
    server = app.getServer()

    shortenedUrl = (await request(app.expressApp)
      .post('/short')
      .send({
        url
      })).body
  }))

  afterAll(() => {
    server.close()
  })

  describe('Main routes test', () => {
    describe('/hello-world', () => {
      test('Should return a "Hello, world!"', async () => {
        const response = await request(app.expressApp)
          .get('/hello-world')

        expect(response.body.message).toBe('Hello, world!')
      })
    })

    describe('/:identifier', () => {
      test('Shoul respond with status 302', async () => {
        const response = await request(app.expressApp)
          .get(`/${shortenedUrl.hash}`)

        expect(response.status).toBe(302)
      })
    })
  })
})
