import PrimitivesValidators from '../../core/lib/PrimitivesValidators'
import { type UUID } from '../../core/types'
import isValidUrl from '../../core/utils/valid-url'

export interface ShortUrlRequestDto {
  url: URL
  alias?: string
}
export interface ShortUrlResponseDto {
  id: UUID
  original: string
  hash: string
  alias?: string
  createdAt: Date
  updatedAt: Date
}

export interface DbUrlQuery {
  id: UUID
  original: string
  alias?: string
  hash: string
  created_at: Date
  updated_at: Date
}

export class ShortUrlRequest implements ShortUrlRequestDto {
  url: URL
  alias?: string | undefined
  constructor ({ url, alias }: any) {
    const { data } = isValidUrl(PrimitivesValidators.isString(url))
    if (!data) {
      const urlError = new Error('Invalid url')
      urlError.name = 'InvalidUrl'
      throw urlError
    }
    this.url = data
    this.alias = alias && PrimitivesValidators.isString(alias)
  }
}
