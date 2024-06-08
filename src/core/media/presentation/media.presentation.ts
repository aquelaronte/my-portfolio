import {
  DeleteMediaUseCase,
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

export class MediaPresentation {
  private dependencies = new MediaDependencies()

  public deleteMedia = this.dependencies.deleteMedia.execute
  public retrieveAllMedias = this.dependencies.retrieveAllMedias.execute
  public uploadMedia = this.dependencies.uploadMedia.execute
}
