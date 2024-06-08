import { UserDomain } from '../../user'

export interface retrieveUserInfoResponse {
  user: Omit<UserDomain, 'password'>
}

export interface retrieveUserInfoCredentials {
  userId: string
}
