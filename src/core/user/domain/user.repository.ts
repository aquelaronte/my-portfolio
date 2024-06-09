import {
  decodeTokenCredentials,
  decodeTokenResponse,
  retrieveUserInfoCredentials,
  retrieveUserInfoResponse,
  signInCredentials,
  signInResponse,
  signUpCredentials,
  signUpResponse,
  verifyUserCredentials,
  verifyUserResponse
} from './actions'

export interface userRepository {
  retrieveUserInfo(
    credentials: retrieveUserInfoCredentials
  ): Promise<retrieveUserInfoResponse>

  signIn(credentials: signInCredentials): Promise<signInResponse>

  signUp(credentials: signUpCredentials): Promise<signUpResponse>

  verifyUser(credentials: verifyUserCredentials): Promise<verifyUserResponse>

  decodeToken(credentials: decodeTokenCredentials): decodeTokenResponse
}
