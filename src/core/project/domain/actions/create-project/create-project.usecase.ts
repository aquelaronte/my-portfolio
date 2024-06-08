import { CreateProjectGateway } from './create-project.gateway'
import {
  createProjectCredentials,
  createProjectResponse
} from './create-project.types'

export class CreateProjectUseCase {
  gateway: CreateProjectGateway
  constructor(gateway: CreateProjectGateway) {
    this.gateway = gateway
  }

  async execute(
    credentials: createProjectCredentials
  ): Promise<createProjectResponse> {
    return this.gateway.execute(credentials)
  }
}
