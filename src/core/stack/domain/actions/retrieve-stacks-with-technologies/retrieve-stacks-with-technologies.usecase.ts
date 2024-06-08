import { RetrieveStacksWithTechnologiesGateway } from './retrieve-stacks-with-technologies.gateway'

export class RetrieveStacksWithTechnologiesUseCase {
  gateway: RetrieveStacksWithTechnologiesGateway

  constructor(gateway: RetrieveStacksWithTechnologiesGateway) {
    this.gateway = gateway
  }

  execute() {
    return this.gateway.execute()
  }
}
