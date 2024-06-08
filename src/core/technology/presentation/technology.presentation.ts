import {
  CreateTechnologyUseCase,
  DeleteTechnologyUseCase,
  RetrieveAllTechnologiesUseCase,
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

export class TechnologyPresentation {
  private dependencies = new TechnologyDependencies()

  readonly createTechnology = this.dependencies.createTechnology.execute
  readonly deleteTechnology = this.dependencies.deleteTechnology.execute
  readonly retrieveAllTechnologies =
    this.dependencies.retrieveAllTechnologies.execute

  readonly updateTechnology = this.dependencies.updateTechnology.execute
}
