import { ProjectDomain } from '../../project'

export interface retrieveAllProjectsResponse {
  projects: (ProjectDomain & {
    mediaAccess: { mediaUrl: string; mediaExpiration: Date; key: string }
  })[]
}
