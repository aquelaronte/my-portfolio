import { errorService, prismaService } from '@/core/core-utils'
import {
  deleteTechnologyCredentials,
  DeleteTechnologyGateway,
  deleteTechnologyResponse
} from '@/core/technology/domain'

export class DeleteTechnologyAdapterV1 implements DeleteTechnologyGateway {
  async execute({
    technologyId
  }: deleteTechnologyCredentials): Promise<deleteTechnologyResponse> {
    try {
      await prismaService.$connect()

      if (
        !(await prismaService.technology.findUnique({
          where: { id: technologyId }
        }))
      ) {
        throw errorService.technologyNotFound
      }

      const deletedTechnology = await prismaService.technology.delete({
        where: { id: technologyId },
        include: { media: true, Stack: true }
      })

      return {
        deletedTechnology: {
          id: deletedTechnology.id,
          name: deletedTechnology.name,
          rate: deletedTechnology.rate,
          description: deletedTechnology.description,
          media: deletedTechnology.media,
          stack: deletedTechnology.Stack,
          createdAt: deletedTechnology.createdAt,
          updatedAt: deletedTechnology.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
