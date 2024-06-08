import { MediaDomain } from '../../media'

export interface uploadMediaResponse {
  media: MediaDomain
}

export interface uploadMediaCredentials {
  file: File
  name: string
  description: string
}
