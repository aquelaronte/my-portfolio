import { RetrieveAllProjectsGateway } from './retrieve-all-projects.gateway'
import { retrieveAllProjectsResponse } from './retrieve-all-projects.types'

export class RetrieveAllProjectsUseCase {
  gateway: RetrieveAllProjectsGateway
  constructor(gateway: RetrieveAllProjectsGateway) {
    this.gateway = gateway
  }

  async execute(): Promise<retrieveAllProjectsResponse> {
    return this.gateway.execute()
  }
}
