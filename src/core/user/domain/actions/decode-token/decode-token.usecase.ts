import { DecodeTokenGateway } from './decode-token.gateway'
import { decodeTokenCredentials } from './decode-token.types'

export class DecodeTokenUseCase {
  gateway: DecodeTokenGateway
  constructor(gateway: DecodeTokenGateway) {
    this.gateway = gateway
  }

  execute(credentials: decodeTokenCredentials) {
    return this.gateway.execute(credentials)
  }
}
