import {
  updateProjectCredentials,
  updateProjectResponse
} from './update-project.types'

export abstract class UpdateProjectGateway {
  abstract execute(
    credentials: updateProjectCredentials
  ): Promise<updateProjectResponse>
}
