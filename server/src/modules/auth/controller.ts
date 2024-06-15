import { type Request, type Response } from 'express'
import AuthValidators from './validator'
import ErrorNames from './../../core/enums/ErrorsNames'
import AuthServices from './services/postgres/AuthServices'
import type BodyResponse from './../../core/enums/Responses'
import { HttpResponsesStatuses, ResponseStatuses } from './../../core/enums/Responses'

class AuthController {
  services = new AuthServices()
  validator = new AuthValidators()
  response: BodyResponse = {
    status: ResponseStatuses.Success,
    data: {},
    message: ''
  }

  async login (req: Request, res: Response): Promise<void> {
    const { body } = req
    try {
      const loginData = this.validator.toLoginDto(body)
      const loginAuth = await this.services.logIn(loginData)
      if (!loginAuth) res.status(HttpResponsesStatuses.NOT_FOUND).json({ message: ' User don\'t found!' })
      else {
        res.status(HttpResponsesStatuses.OK).json(loginAuth)
      }
    } catch (e: any) {
      const { name } = e
      if (name === ErrorNames.TypeError) {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Invalid data format' })
      }

      if (name === 'password error') {
        res.status(401).json({ message: 'Incorrect password' })
      }
    }
  }

  async signup (req: Request, res: Response): Promise<void> {
    const { body } = req

    try {
      const signUpData = this.validator.toSignUpDto(body)

      const responseDto = await this.services.signUp(signUpData)

      if (responseDto !== null) {
        res.status(HttpResponsesStatuses.CREATED).json(responseDto)
      } else {
        res.status(HttpResponsesStatuses.CONFLICT).json({ message: 'User already registered' })
      }
    } catch (e: any) {
      const { name } = e

      console.log(e)
      if (name === ErrorNames.TypeError) {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Invalid data format' })
      }
    }
  }
}

export default new AuthController()
