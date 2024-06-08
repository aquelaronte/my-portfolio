import { authService, errorService, prismaService } from '@/core/core-utils'
import {
  signUpCredentials,
  SignUpGateway,
  signUpResponse
} from '@/core/user/domain'

export class SignUpAdapterV1 implements SignUpGateway {
  async execute({
    email,
    password
  }: signUpCredentials): Promise<signUpResponse> {
    try {
      await prismaService.$connect()

      const verifyUser = await prismaService.user.findUnique({
        where: { email }
      })

      if (verifyUser) {
        throw errorService.userAlreadyExists
      }

      const hashedPassword = await authService.encryptPWD(password)

      const createdUser = await prismaService.user.create({
        data: { email, password: hashedPassword }
      })

      return { createdUser }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
