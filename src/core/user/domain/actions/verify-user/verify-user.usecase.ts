import { VerifyUserGateway } from './verify-user.gateway'
import { verifyUserCredentials } from './verify-user.types'

export class VerifyUserUseCase {
  gateway: VerifyUserGateway

  constructor(gateway: VerifyUserGateway) {
    this.gateway = gateway
  }

  async execute(credentials: verifyUserCredentials) {
    return this.gateway.execute(credentials)
  }
}
