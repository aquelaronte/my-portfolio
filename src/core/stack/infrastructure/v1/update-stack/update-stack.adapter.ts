import { errorService, prismaService } from '@/core/core-utils'
import {
  updateStackCredentials,
  UpdateStackGateway,
  updateStackResponse
} from '@/core/stack/domain'

export class UpdateStackAdapterV1 implements UpdateStackGateway {
  async execute({
    name,
    stackId
  }: updateStackCredentials): Promise<updateStackResponse> {
    try {
      await prismaService.$connect()

      const verifyStack = await prismaService.stack.findUnique({
        where: { id: stackId }
      })

      if (!verifyStack) {
        throw errorService.stackNotFound
      }

      await prismaService.stack.update({
        where: { id: stackId },
        data: { name }
      })

      return {
        updateStack: verifyStack
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
