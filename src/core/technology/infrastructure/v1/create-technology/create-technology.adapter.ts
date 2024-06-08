import { errorService, prismaService } from '@/core/core-utils'
import {
  createTechnologyCredentials,
  CreateTechnologyGateway,
  createTechnologyResponse
} from '@/core/technology/domain'

export class CreateTechnologyAdapterV1 implements CreateTechnologyGateway {
  async execute({
    name,
    rate,
    description,
    mediaId,
    stackId
  }: createTechnologyCredentials): Promise<createTechnologyResponse> {
    try {
      await prismaService.$connect()

      if (!(await prismaService.media.findUnique({ where: { id: mediaId } }))) {
        throw errorService.mediaNotFound
      }

      if (!(await prismaService.stack.findUnique({ where: { id: stackId } }))) {
        throw errorService.stackNotFound
      }

      const technology = await prismaService.technology.create({
        data: {
          name,
          rate,
          description,
          mediaId,
          stackId
        },
        include: { media: true, Stack: true }
      })

      return {
        technology: {
          id: technology.id,
          name: technology.name,
          rate: technology.rate,
          description: technology.description,
          media: technology.media,
          stack: technology.Stack,
          createdAt: technology.createdAt,
          updatedAt: technology.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
