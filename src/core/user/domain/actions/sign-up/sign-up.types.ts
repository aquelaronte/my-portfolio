import { UserDomain } from '../../user'

export interface signUpCredentials {
  email: string
  password: string
}

export interface signUpResponse {
  createdUser: Omit<UserDomain, 'password'>
}
