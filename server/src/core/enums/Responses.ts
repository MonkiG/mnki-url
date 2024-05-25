export enum HttpResponsesStatuses {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  METHOD_NOT_ALLOWED = 405,
  NOT_FOUND = 404,
  CONFLICT = 409,
  ERROR = 500
}

export enum ResponseStatuses {
  Success = 'success',
  Fail = 'fail',
  Error = 'error'
}

export default interface BodyResponse {
  status: ResponseStatuses
  message?: string
  data?: any
}
