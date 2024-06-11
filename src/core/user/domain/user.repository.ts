import {
  DecodeTokenGateway,
  RetrieveUserInfoGateway,
  SignInGateway,
  SignUpGateway,
  VerifyUserGateway
} from './actions'

export interface userRepository {
  retrieveUserInfo: RetrieveUserInfoGateway
  signIn: SignInGateway
  signUp: SignUpGateway
  verifyUser: VerifyUserGateway
  decodeToken: DecodeTokenGateway
}
