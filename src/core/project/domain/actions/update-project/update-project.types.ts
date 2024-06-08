import { ProjectDomain } from '../../project'

export interface updateProjectCredentials {
  id: string
  projectAttributes: Partial<ProjectDomain>
}

export interface updateProjectResponse {
  updatedProject: ProjectDomain
}
