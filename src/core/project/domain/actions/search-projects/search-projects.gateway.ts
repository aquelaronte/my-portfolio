import {
  searchProjectsCredentials,
  searchProjectsResponse
} from './search-projects.types'

export abstract class SearchProjectsGateway {
  abstract execute(
    credentials: searchProjectsCredentials
  ): Promise<searchProjectsResponse>
}
