import { authService, errorService, prismaService } from '@/core/core-utils'
import {
  signInCredentials,
  SignInGateway,
  signInResponse
} from '@/core/user/domain'

export class SignInAdapterV1 implements SignInGateway {
  async execute({
    email,
    password
  }: signInCredentials): Promise<signInResponse> {
    try {
      await prismaService.$connect()

      const user = await prismaService.user.findUnique({
        where: { email }
      })

      if (!user) {
        throw errorService.userNotFound
      }

      const isPasswordValid = await authService.verifyPWD(
        password,
        user.password
      )

      if (!isPasswordValid) {
        throw errorService.invalidPassword
      }

      const jwt = authService.signJWT({ id: user.id, email: user.email })

      return { token: jwt }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
