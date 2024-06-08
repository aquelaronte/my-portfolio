import {
  uploadMediaCredentials,
  uploadMediaResponse
} from './upload-media.types'

export abstract class UploadMediaGateway {
  abstract execute(
    credentials: uploadMediaCredentials
  ): Promise<uploadMediaResponse>
}
