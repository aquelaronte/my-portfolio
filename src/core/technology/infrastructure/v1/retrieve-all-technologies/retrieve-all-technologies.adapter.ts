import { prismaService } from '@/core/core-utils'
import {
  RetrieveAllTechnologiesGateway,
  retrieveAllTechnologiesResponse
} from '@/core/technology/domain'

export class RetrieveAllTechnologiesAdapterV1
  implements RetrieveAllTechnologiesGateway
{
  async execute(): Promise<retrieveAllTechnologiesResponse> {
    try {
      await prismaService.$connect()

      const technologies = await prismaService.technology.findMany({
        include: { media: true, Stack: true }
      })

      return {
        technologies: technologies.map((technology) => {
          return {
            id: technology.id,
            name: technology.name,
            rate: technology.rate,
            description: technology.description,
            media: technology.media,
            stack: technology.Stack,
            createdAt: technology.createdAt,
            updatedAt: technology.updatedAt
          }
        })
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
