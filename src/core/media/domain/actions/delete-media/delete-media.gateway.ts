import {
  deleteMediaCredentials,
  deleteMediaResponse
} from './delete-media.types'

export abstract class DeleteMediaGateway {
  abstract execute(
    credentials: deleteMediaCredentials
  ): Promise<deleteMediaResponse>
}
