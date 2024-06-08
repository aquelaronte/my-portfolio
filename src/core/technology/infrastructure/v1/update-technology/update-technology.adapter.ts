import { errorService, prismaService } from '@/core/core-utils'
import {
  updateTechnologyCredentials,
  UpdateTechnologyGateway,
  updateTechnologyResponse
} from '@/core/technology/domain'

export class UpdateTechnologyAdapterV1 implements UpdateTechnologyGateway {
  async execute({
    updateTechnology
  }: updateTechnologyCredentials): Promise<updateTechnologyResponse> {
    try {
      await prismaService.$connect()

      if (
        !(await prismaService.technology.findUnique({
          where: { id: updateTechnology.id }
        }))
      ) {
        throw errorService.technologyNotFound
      }

      if (
        !(await prismaService.media.findUnique({
          where: { id: updateTechnology.media?.id }
        }))
      ) {
        throw errorService.mediaNotFound
      }

      if (
        !(await prismaService.stack.findUnique({
          where: { id: updateTechnology.stack?.id }
        }))
      ) {
        throw errorService.stackNotFound
      }

      const updatedTechnology = await prismaService.technology.update({
        where: { id: updateTechnology.id },
        data: {
          name: updateTechnology.name,
          rate: updateTechnology.rate,
          description: updateTechnology.description,
          mediaId: updateTechnology.media?.id,
          stackId: updateTechnology.stack?.id
        },
        include: { media: true, Stack: true }
      })

      return {
        updatedTechnology: {
          id: updatedTechnology.id,
          name: updatedTechnology.name,
          rate: updatedTechnology.rate,
          description: updatedTechnology.description,
          media: updatedTechnology.media,
          stack: updatedTechnology.Stack,
          createdAt: updatedTechnology.createdAt,
          updatedAt: updatedTechnology.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
