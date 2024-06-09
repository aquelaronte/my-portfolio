import {
  createStackCredentials,
  createStackResponse,
  deleteStackCredentials,
  deleteStackResponse,
  retrieveAllStacksResponse,
  retrieveStacksWithTechnologiesResponse,
  updateStackCredentials,
  updateStackResponse
} from './actions'

export interface stackRepository {
  createStack(credentials: createStackCredentials): Promise<createStackResponse>

  deleteStack(credentials: deleteStackCredentials): Promise<deleteStackResponse>

  retrieveAllStacks(): Promise<retrieveAllStacksResponse>

  retrieveStacksWithTechnologies(): Promise<retrieveStacksWithTechnologiesResponse>

  updateStack(credentials: updateStackCredentials): Promise<updateStackResponse>
}
