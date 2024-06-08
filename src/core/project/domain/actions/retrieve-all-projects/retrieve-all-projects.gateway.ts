import { retrieveAllProjectsResponse } from './retrieve-all-projects.types'

export abstract class RetrieveAllProjectsGateway {
  abstract execute(): Promise<retrieveAllProjectsResponse>
}
