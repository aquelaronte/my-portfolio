import { prismaService } from '@/core/core-utils'
import {
  createStackCredentials,
  CreateStackGateway,
  createStackResponse
} from '@/core/stack/domain'

export class CreateStackAdapterV1 implements CreateStackGateway {
  async execute({
    name
  }: createStackCredentials): Promise<createStackResponse> {
    try {
      await prismaService.$connect()

      const stack = await prismaService.stack.create({
        data: {
          name
        }
      })

      return {
        createdStack: stack
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
