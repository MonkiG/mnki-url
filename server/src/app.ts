import type Environment from './core/enums/environments'
import express, { json, type Express } from 'express'
import { type Server } from 'node:http'
import morgan from 'morgan'
import cors from 'cors'
import AuthRouter from './modules/auth/routes'
import UserRouter from './modules/user/routes'
import UrlRouter from './modules/url/routes'
import UserLinksRouter from './modules/user-urls/routes'
import MainRouter from './modules/index/route'

export default class App {
  port: number
  environment: Environment
  #server?: Server
  expressApp: Express

  constructor ({
    port,
    environment
  }: {
    port: number
    environment: Environment
  }) {
    this.port = port
    this.environment = environment
    this.expressApp = express()
  }

  #middlewares (): void {
    this.expressApp.use(cors({
      origin: 'http://localhost:5173'
    }))
    this.expressApp.use(morgan('dev'))
    this.expressApp.use(json())
  }

  #routes (): void {
    this.expressApp.use('/auth', new AuthRouter().router)
    this.expressApp.use('/user/:id/urls', new UserLinksRouter().router)
    this.expressApp.use('/user', new UserRouter().router)
    this.expressApp.use('/short', new UrlRouter().router)
    this.expressApp.use(new MainRouter().router)
  }

  getServer (): Server {
    if (!this.#server) {
      throw new Error('Server not setted, you should start the application first.')
    }
    return this.#server
  }

  start (): void {
    this.#middlewares()
    this.#routes()
    this.#server = this.expressApp.listen(this.port, () => {
      console.log(`Server initialized in port ${this.port}, with environment: ${this.environment}`)
    })
  }
}
