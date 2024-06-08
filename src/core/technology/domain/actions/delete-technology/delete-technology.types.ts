import { TechnologyDomain } from '../../technology'

export interface deleteTechnologyCredentials {
  technologyId: string
}

export interface deleteTechnologyResponse {
  deletedTechnology: TechnologyDomain
}
