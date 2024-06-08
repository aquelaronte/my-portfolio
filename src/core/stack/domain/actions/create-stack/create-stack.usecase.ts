import { CreateStackGateway } from './create-stack.gateway'
import {
  createStackCredentials,
  createStackResponse
} from './create-stack.types'

export class CreateStackUseCase {
  gateway: CreateStackGateway

  constructor(gateway: CreateStackGateway) {
    this.gateway = gateway
  }

  async execute(
    credentials: createStackCredentials
  ): Promise<createStackResponse> {
    return this.gateway.execute(credentials)
  }
}
