import {
  CreateTechnologyUseCase,
  DeleteTechnologyUseCase,
  RetrieveAllTechnologiesUseCase,
  technologyRepository,
  UpdateTechnologyUseCase
} from '../domain'
import {
  CreateTechnologyAdapterV1,
  DeleteTechnologyAdapterV1,
  RetrieveAllTechnologiesAdapterV1,
  UpdateTechnologyAdapterV1
} from '../infrastructure/v1'

class TechnologyDependencies {
  public createTechnology = new CreateTechnologyUseCase(
    new CreateTechnologyAdapterV1()
  )

  public deleteTechnology = new DeleteTechnologyUseCase(
    new DeleteTechnologyAdapterV1()
  )

  public retrieveAllTechnologies = new RetrieveAllTechnologiesUseCase(
    new RetrieveAllTechnologiesAdapterV1()
  )

  public updateTechnology = new UpdateTechnologyUseCase(
    new UpdateTechnologyAdapterV1()
  )
}

export class TechnologyPresentation implements technologyRepository {
  private dependencies = new TechnologyDependencies()

  public readonly createTechnology = this.dependencies.createTechnology.execute
  public readonly deleteTechnology = this.dependencies.deleteTechnology.execute
  public readonly retrieveAllTechnologies =
    this.dependencies.retrieveAllTechnologies.execute

  public readonly updateTechnology = this.dependencies.updateTechnology.execute
}
