import { TechnologyDomain } from '../../technology'

export interface createTechnologyCredentials {
  rate: number
  name: string
  description: string
  mediaId: string
  stackId: string
}

export interface createTechnologyResponse {
  technology: TechnologyDomain
}
