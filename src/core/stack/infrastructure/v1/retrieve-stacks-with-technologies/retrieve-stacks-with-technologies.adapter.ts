import { prismaService } from '@/core/core-utils'
import {
  RetrieveStacksWithTechnologiesGateway,
  retrieveStacksWithTechnologiesResponse
} from '@/core/stack/domain'

export class RetrieveStacksWithTechnologiesAdapterV1
  implements RetrieveStacksWithTechnologiesGateway
{
  async execute(): Promise<retrieveStacksWithTechnologiesResponse> {
    try {
      await prismaService.$connect()

      const stacks = await prismaService.stack.findMany({
        include: { stack: { include: { Stack: true, media: true } } }
      })

      return {
        stacks: stacks.map((stack) => {
          return {
            id: stack.id,
            name: stack.name,
            technologies: stack.stack.map((technology) => {
              return {
                id: technology.id,
                rate: technology.rate,
                name: technology.name,
                description: technology.description,
                media: {
                  id: technology.media.id,
                  name: technology.media.name,
                  description: technology.media.description,
                  key: technology.media.key,
                  createdAt: technology.media.createdAt,
                  updatedAt: technology.media.updatedAt
                },
                stack: {
                  id: technology.Stack.id,
                  name: technology.Stack.name,
                  createdAt: technology.Stack.createdAt,
                  updatedAt: technology.Stack.updatedAt
                },
                createdAt: technology.createdAt,
                updatedAt: technology.updatedAt
              }
            }),
            createdAt: stack.createdAt,
            updatedAt: stack.updatedAt
          }
        })
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
