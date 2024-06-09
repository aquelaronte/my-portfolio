import {
  deleteMediaCredentials,
  deleteMediaResponse,
  retrieveAllMediasResponse,
  uploadMediaCredentials,
  uploadMediaResponse
} from './actions'

export interface mediaRepository {
  deleteMedia(credentials: deleteMediaCredentials): Promise<deleteMediaResponse>
  retrieveAllMedias(): Promise<retrieveAllMediasResponse>
  uploadMedia(credentials: uploadMediaCredentials): Promise<uploadMediaResponse>
}
