import {
  updateStackCredentials,
  updateStackResponse
} from './update-stack.types'

export abstract class UpdateStackGateway {
  abstract execute(
    credentials: updateStackCredentials
  ): Promise<updateStackResponse>
}
