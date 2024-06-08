import { ProjectDomain } from '../../project'

export interface deleteProjectResponse {
  deletedProject: ProjectDomain
}

export interface deleteProjectCredentials {
  id: string
}
