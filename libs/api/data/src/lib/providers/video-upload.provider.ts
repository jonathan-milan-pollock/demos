import { Inject, Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { mapTo, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { ENV, Media } from '@dark-rush-photography/shared/types';
import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { AzureStorageProvider } from './azure-storage.provider';
import { ServerlessVideoProvider } from './serverless-video.provider';
import { VideoProvider } from './video.provider';
import { VideoDimensionProvider } from './video-dimension.provider';

@Injectable()
export class VideoUploadProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider,
    private readonly serverlessVideoProvider: ServerlessVideoProvider
  ) {}

  upload$(
    media: Media,
    file: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    Logger.log('Uploading video', VideoUploadProvider.name);
    return from(
      this.azureStorageProvider.uploadBufferToBlob$(
        this.env.azureStorageConnectionString,
        AzureStorageType.Private,
        file.buffer,
        this.azureStorageProvider.getBlobPath(media)
      )
    ).pipe(
      tap(() => Logger.log('Update date created', VideoUploadProvider.name)),
      switchMapTo(from(this.updateDateCreated$(media, entityModel))),
      tap(() => Logger.log('Exif video', VideoUploadProvider.name)),
      tap(() => Logger.log('Resize video', VideoUploadProvider.name)),
      switchMapTo(
        from(this.videoDimensionProvider.resizeVideo$(media, entityModel))
      ),
      switchMapTo(
        from(
          this.videoProvider.setIsProcessing$(
            media.id,
            media.entityId,
            false,
            entityModel
          )
        )
      )
    );
  }

  updateDateCreated$(
    media: Media,
    entityModel: Model<DocumentModel>
  ): Observable<Media> {
    return this.serverlessVideoProvider
      .serverlessFindDateVideoCreated$({
        video: media,
      })
      .pipe(
        switchMap((dateCreated) =>
          this.videoProvider.setDateCreated$(
            media.id,
            media.entityId,
            dateCreated,
            entityModel
          )
        ),
        mapTo(media)
      );
  }
}
