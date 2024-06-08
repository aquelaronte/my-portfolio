import { StackDomain } from '../../stack'

export interface updateStackCredentials {
  stackId: string
  name: string
}

export interface updateStackResponse {
  updateStack: StackDomain
}
