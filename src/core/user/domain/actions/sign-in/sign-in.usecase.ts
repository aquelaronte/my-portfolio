import { SignInGateway } from './sign-in.gateway'
import { signInCredentials, signInResponse } from './sign-in.types'

export class SignInUseCase {
  gateway: SignInGateway

  constructor(gateway: SignInGateway) {
    this.gateway = gateway
  }

  async execute(credentials: signInCredentials): Promise<signInResponse> {
    return this.gateway.execute(credentials)
  }
}
