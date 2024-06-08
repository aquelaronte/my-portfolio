import {
  deleteProjectCredentials,
  deleteProjectResponse
} from './delete-project.types'

export abstract class DeleteProjectGateway {
  abstract execute(
    credentials: deleteProjectCredentials
  ): Promise<deleteProjectResponse>
}
