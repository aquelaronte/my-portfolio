import { StackDomain } from '../../stack'

export interface createStackResponse {
  createdStack: StackDomain
}

export interface createStackCredentials {
  name: string
}
