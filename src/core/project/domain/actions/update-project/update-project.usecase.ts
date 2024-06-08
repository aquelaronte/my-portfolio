import { UpdateProjectGateway } from './update-project.gateway'
import {
  updateProjectCredentials,
  updateProjectResponse
} from './update-project.types'

export class UpdateProjectUseCase {
  gateway: UpdateProjectGateway
  constructor(gateway: UpdateProjectGateway) {
    this.gateway = gateway
  }

  async execute(
    credentials: updateProjectCredentials
  ): Promise<updateProjectResponse> {
    return this.gateway.execute(credentials)
  }
}
