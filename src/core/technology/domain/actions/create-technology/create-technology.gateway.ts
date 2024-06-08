import {
  createTechnologyCredentials,
  createTechnologyResponse
} from './create-technology.types'

export abstract class CreateTechnologyGateway {
  abstract execute(
    credentials: createTechnologyCredentials
  ): Promise<createTechnologyResponse>
}
