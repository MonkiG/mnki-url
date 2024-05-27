import Config from '../../core/config'
import { type UUID } from './../../core/types'

export interface RequestShorURLConstructor {
  url: string
  alias?: string

}

export class RequestShorURL {
  url: string
  alias?: string
  constructor ({ url, alias }: any) {
    this.url = url
    this.alias = alias
  }
}
export class ShortURL {
  id: UUID
  original: string
  hash: string
  alias?: string

  constructor ({
    id, original, hash, alias
  }: ShortURLConstructor) {
    this.id = id
    this.original = original
    this.hash = hash
    this.alias = alias
  }
}

export class ResponseShortUrlDTO {
  id: UUID
  original: string
  hash: string
  alias?: string
  createdAt: Date
  updatedAt: Date
  shorted: string[]
  constructor ({
    id,
    original,
    hash,
    alias,
    createdAt,
    updatedAt
  }: ResponseShortUrlConstructor) {
    this.id = id
    this.original = original
    this.hash = hash
    this.alias = alias
    this.createdAt = new Date(createdAt)
    this.updatedAt = new Date(updatedAt)
    this.shorted = this.alias ? [`${Config.DOMAIN}/${this.hash}`, `${Config.DOMAIN}/${this.alias}}`] : [`${Config.DOMAIN}/${this.hash}`]
  }
}

export interface ResponseShortUrlConstructor extends ShortURLConstructor {
  createdAt: Date
  updatedAt: Date
}
export interface ShortURLConstructor {
  id: UUID
  original: string
  hash: string
  alias?: string
}
