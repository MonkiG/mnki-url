import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import App from './../../src/app'
import request from 'supertest'
import { type Server } from 'node:http'
import Environment from '../../src/core/enums/environments'
import { type DbAuthQuery } from '../../src/modules/auth/models'
import { pool } from '../../src/context/context.postgres'
import { HttpResponsesStatuses } from '../../src/core/enums/Responses'

describe('User url\'s tests', async () => {
  let app: App
  let server: Server
  const url = 'https://www.youtube.com/watch?v=4dkWsytM1kg/'
  let urlStored
  let user
  beforeAll(async () => {
    app = new App({ port: 3007, environment: Environment.LOCAL })
    app.start()
    server = app.getServer()
    const { rows: [data] } = await pool.query<DbAuthQuery>('INSERT INTO users(user_name, email, password) VALUES (\'MonkiG\',\'some1@email.com\',\'password\') RETURNING *')
    user = data
  })

  afterAll(async () => {
    server.close()
    await pool.query('DELETE FROM users WHERE id=$1', [user.id])
  })

  describe('Store', () => {
    test('Should return stauts 204', async () => {
      const response = await request(app.expressApp)
        .post(`/user/${user.id}/urls`)
        .set('content-type', 'application/json')
        .send({
          url,
          alias: 'midu-svelte'
        })

      urlStored = response.body
      expect(response.status).toBe(HttpResponsesStatuses.CREATED)
    })
  })
  describe('Get All', () => {
    test('Should return status 200', async () => {
      const response = await request(app.expressApp)
        .get(`/user/${user.id}/urls`)

      expect(response.status).toBe(200)
    })
  })

  describe('Get', () => {
    test('Should return status 200', async () => {
      const response = await request(app.expressApp)
        .get(`/user/${user.id}/urls/${urlStored.id}`)

      expect(response.status).toBe(200)
    })
  })

  describe('Update', () => {
    test('Should return status 200', async () => {
      const response = await request(app.expressApp)
        .patch(`/user/${user.id}/urls/${urlStored.id}`)
        .send({
          alias: 'new-alias'
        })

      expect(response.status).toBe(200)
    })
  })
  describe('Delete', () => {
    test('Should return status 204', async () => {
      const response = await request(app.expressApp)
        .delete(`/user/${user.id}/urls/${urlStored.id}`)

      expect(response.status).toBe(204)
    })
  })
})
