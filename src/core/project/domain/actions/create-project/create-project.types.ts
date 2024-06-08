import { ProjectDomain } from '../../project'

export interface createProjectResponse {
  createdProject: ProjectDomain & { mediaUrl: string; mediaExpiration: number }
}

export interface createProjectCredentials {
  name: string
  description: string
  url: string
  mediaId: string
}
