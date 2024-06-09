import {
  createTechnologyCredentials,
  createTechnologyResponse,
  deleteTechnologyCredentials,
  deleteTechnologyResponse,
  retrieveAllTechnologiesResponse,
  updateTechnologyCredentials,
  updateTechnologyResponse
} from './actions'

export interface technologyRepository {
  createTechnology(
    credentials: createTechnologyCredentials
  ): Promise<createTechnologyResponse>

  deleteTechnology(
    credentials: deleteTechnologyCredentials
  ): Promise<deleteTechnologyResponse>

  retrieveAllTechnologies(): Promise<retrieveAllTechnologiesResponse>

  updateTechnology(
    credentials: updateTechnologyCredentials
  ): Promise<updateTechnologyResponse>
}
