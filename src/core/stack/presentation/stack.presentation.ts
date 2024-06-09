import {
  CreateStackUseCase,
  DeleteStackUseCase,
  RetrieveAllStacksUseCase,
  RetrieveStacksWithTechnologiesUseCase,
  stackRepository,
  UpdateStackUseCase
} from '../domain'
import {
  CreateStackAdapterV1,
  DeleteStackAdapterV1,
  RetrieveAllStacksAdapterV1,
  RetrieveStacksWithTechnologiesAdapterV1,
  UpdateStackAdapterV1
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

  public updateStack = new UpdateStackUseCase(new UpdateStackAdapterV1())
}

export class StackPresentation implements stackRepository {
  private dependencies = new StackDependencies()

  public readonly createStack = this.dependencies.createStack.execute
  public readonly deleteStack = this.dependencies.deleteStack.execute
  public readonly retrieveAllStacks =
    this.dependencies.retrieveAllStacks.execute

  public readonly retrieveStacksWithTechnologies =
    this.dependencies.retrieveStacksWithTechnologies.execute

  public readonly updateStack = this.dependencies.updateStack.execute
}
