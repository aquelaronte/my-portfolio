import { retrieveAllTechnologiesResponse } from './retrieve-all-technologies.types'

export abstract class RetrieveAllTechnologiesGateway {
  abstract execute(): Promise<retrieveAllTechnologiesResponse>
}
