import { prismaService, S3Service } from '@/core/core-utils'
import {
  RetrieveAllMediasGateway,
  retrieveAllMediasResponse
} from '@/core/media/domain'

export class RetrieveAllMediasAdapterV1 implements RetrieveAllMediasGateway {
  async execute(): Promise<retrieveAllMediasResponse> {
    try {
      await prismaService.$connect()

      const medias = await prismaService.media.findMany()

      const files = await S3Service.getFiles(medias.map((media) => media.key))

      const response = medias.map((media, index) => ({
        id: media.id,
        name: media.name,
        key: media.key,
        description: media.description,
        createdAt: media.createdAt,
        updatedAt: media.updatedAt,
        expiration: new Date(Date.now() + files[index].expiration * 1000),
        url: files[index].response
      }))

      return {
        medias: response
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
