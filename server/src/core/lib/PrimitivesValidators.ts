import TypeError from './../errors/TypeError'
export default abstract class PrimitivesValidators {
  static isString (data: any): string {
    if (!(data instanceof String) && !(typeof data === 'string')) {
      throw new TypeError(`${data} is not a string`)
    }

    return data as string
  }

  static isNumber (data: any): number {
    if (!(data instanceof Number) || !(typeof data === 'number')) {
      throw new TypeError(`${data} is not a number`)
    }

    return data
  }
}
