import { prismaService } from '@/core/core-utils'
import {
  RetrieveAllStacksGateway,
  retrieveAllStacksResponse
} from '@/core/stack/domain'

export class RetrieveAllStacksAdapterV1 implements RetrieveAllStacksGateway {
  async execute(): Promise<retrieveAllStacksResponse> {
    try {
      await prismaService.$connect()

      const stacks = await prismaService.stack.findMany()

      return {
        stacks
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
