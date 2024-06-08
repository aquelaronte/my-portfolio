import { UploadMediaGateway } from './upload-media.gateway'
import {
  uploadMediaCredentials,
  uploadMediaResponse
} from './upload-media.types'

export class UploadMediaUseCase {
  gateway: UploadMediaGateway
  constructor(gateway: UploadMediaGateway) {
    this.gateway = gateway
  }

  async execute(
    credentials: uploadMediaCredentials
  ): Promise<uploadMediaResponse> {
    return this.gateway.execute(credentials)
  }
}
