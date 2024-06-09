import {
  createProjectCredentials,
  createProjectResponse,
  deleteProjectCredentials,
  deleteProjectResponse,
  retrieveAllProjectsResponse,
  searchProjectsCredentials,
  searchProjectsResponse,
  updateProjectCredentials,
  updateProjectResponse
} from './actions'

export interface projectRepository {
  createProject(
    credentials: createProjectCredentials
  ): Promise<createProjectResponse>

  deleteProject(
    credentials: deleteProjectCredentials
  ): Promise<deleteProjectResponse>

  retrieveAllProjects(): Promise<retrieveAllProjectsResponse>

  searchProjects(
    credentials: searchProjectsCredentials
  ): Promise<searchProjectsResponse>

  updateProject(
    credentials: updateProjectCredentials
  ): Promise<updateProjectResponse>
}
