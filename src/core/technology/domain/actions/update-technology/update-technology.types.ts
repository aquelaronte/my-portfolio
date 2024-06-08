import { TechnologyDomain } from '../../technology'

export interface updateTechnologyCredentials {
  updateTechnology: Partial<TechnologyDomain>
}

export interface updateTechnologyResponse {
  updatedTechnology: TechnologyDomain
}
