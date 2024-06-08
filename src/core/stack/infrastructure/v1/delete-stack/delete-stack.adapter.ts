import { errorService, prismaService } from '@/core/core-utils'
import {
  deleteStackCredentials,
  DeleteStackGateway,
  deleteStackResponse
} from '@/core/stack/domain'

export class DeleteStackAdapterV1 implements DeleteStackGateway {
  async execute({ id }: deleteStackCredentials): Promise<deleteStackResponse> {
    try {
      await prismaService.$connect()

      const verifyStack = await prismaService.stack.findUnique({
        where: { id }
      })

      if (!verifyStack) {
        throw errorService.stackNotFound
      }

      await prismaService.stack.delete({ where: { id } })

      return {
        deletedStack: verifyStack
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
