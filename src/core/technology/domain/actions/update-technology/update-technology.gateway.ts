import {
  updateTechnologyCredentials,
  updateTechnologyResponse
} from './update-technology.types'

export abstract class UpdateTechnologyGateway {
  abstract execute(
    credentials: updateTechnologyCredentials
  ): Promise<updateTechnologyResponse>
}
