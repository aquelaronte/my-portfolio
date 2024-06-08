import { authService, prismaService } from '@/core/core-utils'
import {
  verifyUserCredentials,
  VerifyUserGateway,
  verifyUserResponse
} from '@/core/user/domain'

export class VerifyUserAdapterV1 implements VerifyUserGateway {
  async execute({ token }: verifyUserCredentials): Promise<verifyUserResponse> {
    try {
      await prismaService.$connect()

      const payload = authService.verifyJWT(token)

      if (!payload) {
        return { isVerified: false }
      }

      const user = await prismaService.user.findUnique({
        where: { id: payload.id }
      })

      if (!user) {
        return { isVerified: false }
      }

      return { isVerified: true }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
