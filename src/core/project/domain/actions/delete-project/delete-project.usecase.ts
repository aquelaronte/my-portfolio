import { DeleteProjectGateway } from './delete-project.gateway'
import {
  deleteProjectCredentials,
  deleteProjectResponse
} from './delete-project.types'

export class DeleteProjectUseCase {
  gateway: DeleteProjectGateway
  constructor(gateway: DeleteProjectGateway) {
    this.gateway = gateway
  }

  async execute(
    credentials: deleteProjectCredentials
  ): Promise<deleteProjectResponse> {
    return this.gateway.execute(credentials)
  }
}
