import { CreateTechnologyGateway } from './create-technology.gateway'
import { createTechnologyCredentials } from './create-technology.types'

export class CreateTechnologyUseCase {
  gateway: CreateTechnologyGateway

  constructor(gateway: CreateTechnologyGateway) {
    this.gateway = gateway
  }

  execute(credentials: createTechnologyCredentials) {
    return this.gateway.execute(credentials)
  }
}
