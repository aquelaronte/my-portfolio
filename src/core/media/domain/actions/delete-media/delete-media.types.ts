import { MediaDomain } from '../../media'

export interface deleteMediaCredentials {
  mediaId: string
}

export interface deleteMediaResponse {
  deletedMedia: MediaDomain
}
