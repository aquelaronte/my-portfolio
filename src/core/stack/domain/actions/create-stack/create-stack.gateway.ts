import {
  createStackCredentials,
  createStackResponse
} from './create-stack.types'

export abstract class CreateStackGateway {
  abstract execute(
    credentials: createStackCredentials
  ): Promise<createStackResponse>
}
