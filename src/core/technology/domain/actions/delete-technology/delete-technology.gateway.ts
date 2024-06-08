import {
  deleteTechnologyCredentials,
  deleteTechnologyResponse
} from './delete-technology.types'

export abstract class DeleteTechnologyGateway {
  abstract execute(
    credentials: deleteTechnologyCredentials
  ): Promise<deleteTechnologyResponse>
}
