import { UpdateStackGateway } from './update-stack.gateway'
import { updateStackCredentials } from './update-stack.types'

export class UpdateStackUseCase {
  gateway: UpdateStackGateway

  constructor(gateway: UpdateStackGateway) {
    this.gateway = gateway
  }

  execute(credentials: updateStackCredentials) {
    return this.gateway.execute(credentials)
  }
}
