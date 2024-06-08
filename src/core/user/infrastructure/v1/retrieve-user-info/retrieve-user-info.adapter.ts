import { errorService, prismaService } from '@/core/core-utils'
import {
  retrieveUserInfoCredentials,
  RetrieveUserInfoGateway,
  retrieveUserInfoResponse
} from '@/core/user/domain'

export class RetrieveUserInfoAdapterV1 implements RetrieveUserInfoGateway {
  async execute({
    userId
  }: retrieveUserInfoCredentials): Promise<retrieveUserInfoResponse> {
    try {
      await prismaService.$connect()

      const user = await prismaService.user.findUnique({
        where: { id: userId }
      })

      if (!user) {
        throw errorService.userNotFound
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
