import { DeleteMediaGateway } from './delete-media.gateway'
import { deleteMediaCredentials } from './delete-media.types'

export class DeleteMediaUseCase {
  gateway: DeleteMediaGateway
  constructor(gateway: DeleteMediaGateway) {
    this.gateway = gateway
  }

  async execute(credentials: deleteMediaCredentials) {
    return this.gateway.execute(credentials)
  }
}
