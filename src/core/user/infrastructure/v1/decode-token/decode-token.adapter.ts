import { authService } from '@/core/core-utils'
import {
  decodeTokenCredentials,
  DecodeTokenGateway,
  decodeTokenResponse
} from '@/core/user/domain'

export class DecodeTokenAdapterV1 implements DecodeTokenGateway {
  execute({ token }: decodeTokenCredentials): decodeTokenResponse {
    const payload = authService.verifyJWT(token)

    return {
      payload
    }
  }
}
