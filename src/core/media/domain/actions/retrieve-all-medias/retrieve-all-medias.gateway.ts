import { retrieveAllMediasResponse } from './retrieve-all-medias.types'

export abstract class RetrieveAllMediasGateway {
  abstract execute(): Promise<retrieveAllMediasResponse>
}
