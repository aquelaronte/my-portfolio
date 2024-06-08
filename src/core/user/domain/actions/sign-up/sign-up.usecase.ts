import { SignUpGateway } from './sign-up.gateway'
import { signUpCredentials, signUpResponse } from './sign-up.types'

export class SignUpUseCase {
  gateway: SignUpGateway
  constructor(gateway: SignUpGateway) {
    this.gateway = gateway
  }

  async execute(credentials: signUpCredentials): Promise<signUpResponse> {
    return this.gateway.execute(credentials)
  }
}
