import {
  createProjectCredentials,
  createProjectResponse
} from './create-project.types'

export abstract class CreateProjectGateway {
  abstract execute(
    credentials: createProjectCredentials
  ): Promise<createProjectResponse>
}
