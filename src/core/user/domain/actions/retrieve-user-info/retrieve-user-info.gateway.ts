import {
  retrieveUserInfoCredentials,
  retrieveUserInfoResponse
} from './retrieve-user-info.types'

export abstract class RetrieveUserInfoGateway {
  abstract execute(
    credentials: retrieveUserInfoCredentials
  ): Promise<retrieveUserInfoResponse>
}
