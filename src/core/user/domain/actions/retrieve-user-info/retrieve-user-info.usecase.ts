import { RetrieveUserInfoGateway } from './retrieve-user-info.gateway'
import {
  retrieveUserInfoCredentials,
  retrieveUserInfoResponse
} from './retrieve-user-info.types'

export class RetrieveUserInfoUseCase {
  gateway: RetrieveUserInfoGateway

  constructor(gateway: RetrieveUserInfoGateway) {
    this.gateway = gateway
  }

  async execute(
    credentials: retrieveUserInfoCredentials
  ): Promise<retrieveUserInfoResponse> {
    return this.gateway.execute(credentials)
  }
}
