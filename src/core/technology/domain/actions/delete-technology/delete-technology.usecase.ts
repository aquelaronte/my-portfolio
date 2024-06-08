import { DeleteTechnologyGateway } from './delete-technology.gateway'
import { deleteTechnologyCredentials } from './delete-technology.types'

export class DeleteTechnologyUseCase {
  gateway: DeleteTechnologyGateway

  constructor(gateway: DeleteTechnologyGateway) {
    this.gateway = gateway
  }

  execute(credentials: deleteTechnologyCredentials) {
    return this.gateway.execute(credentials)
  }
}
