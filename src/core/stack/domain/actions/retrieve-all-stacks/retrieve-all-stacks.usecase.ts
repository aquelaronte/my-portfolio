import { RetrieveAllStacksGateway } from './retrieve-all-stacks.gateway'
import { retrieveAllStacksResponse } from './retrieve-all-stacks.types'

export class RetrieveAllStacksUseCase {
  gateway: RetrieveAllStacksGateway

  constructor(gateway: RetrieveAllStacksGateway) {
    this.gateway = gateway
  }

  async execute(): Promise<retrieveAllStacksResponse> {
    return this.gateway.execute()
  }
}
