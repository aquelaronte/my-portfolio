import { signUpCredentials, signUpResponse } from './sign-up.types'

export abstract class SignUpGateway {
  abstract execute(credentials: signUpCredentials): Promise<signUpResponse>
}
