import {
  DeleteMediaUseCase,
  mediaRepository,
  RetrieveAllMediasUseCase,
  UploadMediaUseCase
} from '../domain'
import {
  DeleteMediaAdapterV1,
  RetrieveAllMediasAdapterV1,
  UploadMediaAdapterV1
} from '../infrastructure/v1'

class MediaDependencies {
  public deleteMedia = new DeleteMediaUseCase(new DeleteMediaAdapterV1())
  public retrieveAllMedias = new RetrieveAllMediasUseCase(
    new RetrieveAllMediasAdapterV1()
  )

  uploadMedia = new UploadMediaUseCase(new UploadMediaAdapterV1())
}

export class MediaPresentation implements mediaRepository {
  private dependencies = new MediaDependencies()

  public readonly deleteMedia = this.dependencies.deleteMedia.execute
  public readonly retrieveAllMedias =
    this.dependencies.retrieveAllMedias.execute

  public readonly uploadMedia = this.dependencies.uploadMedia.execute
}
