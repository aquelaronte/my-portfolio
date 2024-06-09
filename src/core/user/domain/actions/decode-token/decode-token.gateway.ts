import {
  decodeTokenCredentials,
  decodeTokenResponse
} from './decode-token.types'

export abstract class DecodeTokenGateway {
  abstract execute(credentials: decodeTokenCredentials): decodeTokenResponse
}
