import {
  DecodeTokenUseCase,
  RetrieveUserInfoUseCase,
  SignInUseCase,
  SignUpUseCase,
  userRepository,
  VerifyUserUseCase
} from '../domain'
import {
  DecodeTokenAdapterV1,
  RetrieveUserInfoAdapterV1,
  SignInAdapterV1,
  SignUpAdapterV1,
  VerifyUserAdapterV1
} from '../infrastructure/v1'

class UserDependecies {
  public retrieveUserInfo = new RetrieveUserInfoUseCase(
    new RetrieveUserInfoAdapterV1()
  )

  public signIn = new SignInUseCase(new SignInAdapterV1())

  public signUp = new SignUpUseCase(new SignUpAdapterV1())

  public verifyUser = new VerifyUserUseCase(new VerifyUserAdapterV1())

  public decodeToken = new DecodeTokenUseCase(new DecodeTokenAdapterV1())
}

export class UserPresentation implements userRepository {
  private dependencies = new UserDependecies()

  public readonly retrieveUserInfo = this.dependencies.retrieveUserInfo.execute
  public readonly signIn = this.dependencies.signIn.execute
  public readonly signUp = this.dependencies.signUp.execute
  public readonly verifyUser = this.dependencies.verifyUser.execute
  public readonly decodeToken = this.dependencies.decodeToken.execute
}
