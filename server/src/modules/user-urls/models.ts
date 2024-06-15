import { type UUID } from '../../core/types'
import { type Link } from '../url/models'
import { type User } from '../user/models'

export default interface UserLink {
  id: UUID
  user: User
  links: Link[]
}
