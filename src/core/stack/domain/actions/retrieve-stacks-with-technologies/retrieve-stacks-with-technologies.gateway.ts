import { retrieveStacksWithTechnologiesResponse } from './retrieve-stacks-with-technologies.types'

export abstract class RetrieveStacksWithTechnologiesGateway {
  abstract execute(): Promise<retrieveStacksWithTechnologiesResponse>
}
