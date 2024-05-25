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

  login (_req: Request, res: Response): void {
    // const { body } = req
    try {
      // const loginData = this.validator.toLoginDto(body)
      // validar en la db

      res.status(HttpResponsesStatuses.OK).json({ message: 'Correct login' })
    } catch (e: any) {
      const { name } = e
      if (name === ErrorNames.TypeError) {
        res.status(HttpResponsesStatuses.BAD_REQUEST).json({ message: 'Invalid data format' })
      }
    }
  }

  async signup (req: Request, res: Response): Promise<void> {
    const { body } = req

    try {
      const signUpData = this.validator.toSignUpDto(body)
      // Enviar a la base de datos

      const responseDto = await this.services.signUp(signUpData)
      console.log(responseDto)
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
