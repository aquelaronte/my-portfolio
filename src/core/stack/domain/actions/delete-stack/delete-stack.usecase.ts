import { DeleteStackGateway } from './delete-stack.gateway'
import { deleteStackCredentials } from './delete-stack.types'

export class DeleteStackUseCase {
  gateway: DeleteStackGateway

  constructor(gateway: DeleteStackGateway) {
    this.gateway = gateway
  }

  execute(credentials: deleteStackCredentials) {
    return this.gateway.execute(credentials)
  }
}
