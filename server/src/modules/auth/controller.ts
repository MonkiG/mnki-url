import { type Request, type Response } from 'express'
import ErrorNames from './../../core/enums/ErrorsNames'
import AuthServices from './services/postgres/AuthServices'
import { HttpResponsesStatuses } from './../../core/enums/Responses'
import { LoginRequest, SignUpRequest } from './models'

class AuthController {
  services = new AuthServices()

  async login (req: Request, res: Response): Promise<void> {
    const { body } = req
    try {
      const loginData = new LoginRequest(body)
      const loginAuth = await this.services.logIn(loginData)
      if (!loginAuth) res.status(HttpResponsesStatuses.NOT_FOUND).json({ message: ' User don\'t found!' })
      else {
        res.status(HttpResponsesStatuses.OK).json(loginAuth)
      }
    } catch (e: any) {
      const { name } = e
      if (name === ErrorNames.TypeError) {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Invalid data format' })
        return
      }
      if (name === 'BadRequest') {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Bad request, you don\'t provided a required information' })
        return
      }
      if (name === 'PasswordError') {
        res.status(HttpResponsesStatuses.UNAUTHORIZED).json({ message: 'Incorrect password' })
        return
      }

      res.status(HttpResponsesStatuses.ERROR).json({ message: 'Server error' })
    }
  }

  async signup (req: Request, res: Response): Promise<void> {
    const { body } = req

    try {
      const signUpData = new SignUpRequest(body)

      const responseDto = await this.services.signUp(signUpData)

      if (responseDto !== null) {
        res.status(HttpResponsesStatuses.CREATED).json(responseDto)
      } else {
        res.status(HttpResponsesStatuses.CONFLICT).json({ message: 'User already registered' })
      }
    } catch (e: any) {
      const { name } = e

      if (name === ErrorNames.TypeError) {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Invalid data format' })
        return
      }

      if (name === 'BadRequest') {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Bad request, you don\'t provided a required information' })
        return
      }
      if (name === 'PasswordError') {
        res.status(HttpResponsesStatuses.UNAUTHORIZED).json({ message: 'Incorrect password' })
        return
      }

      res.status(HttpResponsesStatuses.ERROR).json({ message: 'Server error' })
    }
  }
}

export default new AuthController()
