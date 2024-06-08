import { retrieveAllStacksResponse } from './retrieve-all-stacks.types'

export abstract class RetrieveAllStacksGateway {
  abstract execute(): Promise<retrieveAllStacksResponse>
}
