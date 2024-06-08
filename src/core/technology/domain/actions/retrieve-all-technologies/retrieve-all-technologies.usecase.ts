import { RetrieveAllTechnologiesGateway } from './retrieve-all-technologies.gateway'

export class RetrieveAllTechnologiesUseCase {
  gateway: RetrieveAllTechnologiesGateway

  constructor(gateway: RetrieveAllTechnologiesGateway) {
    this.gateway = gateway
  }

  execute() {
    return this.gateway.execute()
  }
}
