import { errorService, prismaService, S3Service } from '@/core/core-utils'
import {
  uploadMediaCredentials,
  UploadMediaGateway,
  uploadMediaResponse
} from '@/core/media/domain'

export class UploadMediaAdapterV1 implements UploadMediaGateway {
  async execute({
    name,
    file,
    description
  }: uploadMediaCredentials): Promise<uploadMediaResponse> {
    try {
      await prismaService.$connect()
      const { key, response } = await S3Service.sendFile(file)

      if (
        response.$metadata.httpStatusCode &&
        response.$metadata.httpStatusCode >= 400
      ) {
        throw errorService.mediaUploadFailed
      }

      const media = await prismaService.media.create({
        data: {
          name,
          key,
          description
        }
      })

      return {
        media: {
          id: media.id,
          name: media.name,
          key: media.key,
          description: media.description,
          createdAt: media.createdAt,
          updatedAt: media.updatedAt
        }
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
