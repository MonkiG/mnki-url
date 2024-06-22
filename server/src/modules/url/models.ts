import InvalidURLError from '../../core/errors/InvalidURLError'
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
  serverUrl: string
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
  serverUrl: string
  constructor ({ url, alias, serverUrl }: any) {
    const { data } = isValidUrl(PrimitivesValidators.isString(url))
    if (!data) {
      throw new InvalidURLError()
    }
    this.serverUrl = serverUrl
    this.url = data
    this.alias = alias && PrimitivesValidators.isString(alias)
  }
}
