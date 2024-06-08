import {
  deleteStackCredentials,
  deleteStackResponse
} from './delete-stack.types'

export abstract class DeleteStackGateway {
  abstract execute(
    credentials: deleteStackCredentials
  ): Promise<deleteStackResponse>
}
