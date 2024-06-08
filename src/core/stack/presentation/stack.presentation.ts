import {
  CreateStackUseCase,
  DeleteStackUseCase,
  RetrieveAllStacksUseCase,
  RetrieveStacksWithTechnologiesUseCase
} from '../domain'
import {
  CreateStackAdapterV1,
  DeleteStackAdapterV1,
  RetrieveAllStacksAdapterV1,
  RetrieveStacksWithTechnologiesAdapterV1
} from '../infrastructure/v1'

class StackDependencies {
  public createStack = new CreateStackUseCase(new CreateStackAdapterV1())
  public deleteStack = new DeleteStackUseCase(new DeleteStackAdapterV1())
  public retrieveAllStacks = new RetrieveAllStacksUseCase(
    new RetrieveAllStacksAdapterV1()
  )

  public retrieveStacksWithTechnologies =
    new RetrieveStacksWithTechnologiesUseCase(
      new RetrieveStacksWithTechnologiesAdapterV1()
    )
}

export class StackPresentation {
  private dependencies = new StackDependencies()

  readonly createStack = this.dependencies.createStack
  readonly deleteStack = this.dependencies.deleteStack
  readonly retrieveAllStacks = this.dependencies.retrieveAllStacks
  readonly retrieveStacksWithTechnologies =
    this.dependencies.retrieveStacksWithTechnologies
}
