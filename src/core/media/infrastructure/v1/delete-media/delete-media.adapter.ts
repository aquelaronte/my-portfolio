import { errorService, prismaService, S3Service } from '@/core/core-utils'
import {
  deleteMediaCredentials,
  DeleteMediaGateway,
  deleteMediaResponse
} from '@/core/media/domain'

export class DeleteMediaAdapterV1 implements DeleteMediaGateway {
  async execute({
    mediaId
  }: deleteMediaCredentials): Promise<deleteMediaResponse> {
    try {
      await prismaService.$connect()

      const media = await prismaService.media.findUnique({
        where: { id: mediaId }
      })

      if (!media) {
        throw errorService.mediaNotFound
      }

      const response = await S3Service.deleteFile(media.key)

      if (
        response.$metadata.httpStatusCode &&
        response.$metadata.httpStatusCode >= 400
      ) {
        throw errorService.mediaDeletionFailed
      }

      const deletedMedia = await prismaService.media.delete({
        where: { id: mediaId }
      })

      return {
        deletedMedia
      }
    } finally {
      await prismaService.$disconnect()
    }
  }
}
