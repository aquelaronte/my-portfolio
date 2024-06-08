import { ProjectDomain } from '../../project'

export interface searchProjectsCredentials {
  search: string
  createdAt?: Date
  technologiesId?: string[]
  stacksId?: string[]
}

export interface searchProjectsResponse {
  projects: (ProjectDomain & {
    imageAccess: { url: string; expiration: Date }
  })[]
}
