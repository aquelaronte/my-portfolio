import { verifyUserCredentials, verifyUserResponse } from './verify-user.types'

export abstract class VerifyUserGateway {
  abstract execute(
    credentials: verifyUserCredentials
  ): Promise<verifyUserResponse>
}
