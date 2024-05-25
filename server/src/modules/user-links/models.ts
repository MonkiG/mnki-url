import { type UUID } from './../../core/types'
import { type Link } from './../../modules/url/models'
import { type User } from './../../modules/user/models'

export default interface UserLink {
  id: UUID
  user: User
  links: Link[]
}
