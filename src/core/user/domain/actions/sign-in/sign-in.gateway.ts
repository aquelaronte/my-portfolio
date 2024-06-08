import { signInCredentials, signInResponse } from './sign-in.types'

export abstract class SignInGateway {
  abstract execute(credentials: signInCredentials): Promise<signInResponse>
}
