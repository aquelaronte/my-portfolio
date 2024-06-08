import { MediaDomain } from '../../media'

export interface retrieveAllMediasResponse {
  medias: (MediaDomain & { url: string; expiration: Date })[]
}
