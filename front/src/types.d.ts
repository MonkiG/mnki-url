export interface UrlFormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  data: InputData
}

export interface InputData {
  url: string
  alias?: string
}

export interface ShortUrlResponse {
  id: ReturnType<typeof crypto.randomUUID>
  serverUrl: string
  original: string
  alias: string
  hash: string
  createdAt: string
  updatedAt: string
}

interface ShortenUrls {
  shortenAlias: string
  shortenHash: string
}

export type shorternUrl = ShortenUrls | string
