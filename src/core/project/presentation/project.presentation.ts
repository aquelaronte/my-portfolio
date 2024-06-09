import {
  CreateProjectUseCase,
  DeleteProjectUseCase,
  projectRepository,
  RetrieveAllProjectsUseCase,
  SearchProjectsUseCase,
  UpdateProjectUseCase
} from '../domain'
import {
  CreateProjectAdapterV1,
  DeleteProjectAdapterV1,
  RetrieveAllProjectsAdapterV1,
  SearchProjectsAdapterV1,
  UpdateProjectAdapterV1
} from '../infrastructure/v1'

class ProjectDependencies {
  public createProject = new CreateProjectUseCase(new CreateProjectAdapterV1())
  public deleteProject = new DeleteProjectUseCase(new DeleteProjectAdapterV1())
  public retrieveAllProjects = new RetrieveAllProjectsUseCase(
    new RetrieveAllProjectsAdapterV1()
  )

  public searchProjects = new SearchProjectsUseCase(
    new SearchProjectsAdapterV1()
  )

  public updateProject = new UpdateProjectUseCase(new UpdateProjectAdapterV1())
}

export class ProjectPresentation implements projectRepository {
  private dependencies = new ProjectDependencies()

  public readonly createProject = this.dependencies.createProject.execute
  public readonly deleteProject = this.dependencies.deleteProject.execute
  public readonly retrieveAllProjects =
    this.dependencies.retrieveAllProjects.execute

  public readonly searchProjects = this.dependencies.searchProjects.execute
  public readonly updateProject = this.dependencies.updateProject.execute
}
