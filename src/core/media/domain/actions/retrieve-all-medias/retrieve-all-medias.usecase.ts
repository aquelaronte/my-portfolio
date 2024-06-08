import { RetrieveAllMediasGateway } from './retrieve-all-medias.gateway'

export class RetrieveAllMediasUseCase {
  gateway: RetrieveAllMediasGateway
  constructor(gateway: RetrieveAllMediasGateway) {
    this.gateway = gateway
  }

  execute() {
    return this.gateway.execute()
  }
}
