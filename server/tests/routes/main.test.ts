import { type Server } from 'node:http'

import request from 'supertest'

import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import App from '../../src/app'
import Environment from '../../src/core/enums/environments'

describe.skip('Main routes tests ("/")', () => {
  let app: App
  let server: Server

  beforeAll(() => {
    app = new App({
      port: 3000,
      environment: Environment.LOCAL
    })
    app.start()
    server = app.getServer()
  })

  // unit test
  describe('Should return "hola mundo"', () => {
    test('/', async () => {
      const response = await request(app.expressApp)
        .get('/')

      expect(response.body.message).toBe('Hello, world!')
    })
  })

  afterAll(() => {
    server.close()
  })
})
