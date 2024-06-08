import { UpdateTechnologyGateway } from './update-technology.gateway'
import { updateTechnologyCredentials } from './update-technology.types'

export class UpdateTechnologyUseCase {
  gateway: UpdateTechnologyGateway

  constructor(gateway: UpdateTechnologyGateway) {
    this.gateway = gateway
  }

  execute(credentials: updateTechnologyCredentials) {
    return this.gateway.execute(credentials)
  }
}
