import { SearchProjectsGateway } from './search-projects.gateway'
import {
  searchProjectsCredentials,
  searchProjectsResponse
} from './search-projects.types'

export class SearchProjectsUseCase {
  gateway: SearchProjectsGateway
  constructor(gateway: SearchProjectsGateway) {
    this.gateway = gateway
  }

  async execute(
    credentials: searchProjectsCredentials
  ): Promise<searchProjectsResponse> {
    return this.gateway.execute(credentials)
  }
}
