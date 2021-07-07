import { Inject, Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';

import {
  ENV,
  Media,
  Video,
  VideoDimension,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { VideoProvider } from './video.provider';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class VideoRemoveProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly videoProvider: VideoProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  remove$(
    video: Video,
    documentModel: DocumentModel,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    Logger.log('Video removal started', VideoRemoveProvider.name);
    return this.videoProvider
      .setIsProcessing$(video.id, video.entityId, true, entityModel)
      .pipe(
        switchMapTo(
          from(
            this.removeVideoBlobs$(
              this.videoProvider.getMedia(
                video.id,
                video.fileName,
                video.state,
                documentModel
              ),
              documentModel.videoDimensions
            )
          )
        ),
        switchMapTo(
          from(
            this.videoProvider.remove$(video.id, video.entityId, entityModel)
          )
        ),
        tap(() =>
          Logger.log('Video removal completed', VideoRemoveProvider.name)
        )
      );
  }

  removeVideoBlob$(media: Media): Observable<boolean> {
    return this.azureStorageProvider.deleteBlob$(
      this.env.azureStorageConnectionString,
      this.azureStorageProvider.getAzureStorageType(media.state),
      this.azureStorageProvider.getBlobPath(media)
    );
  }

  removeVideoBlobs$(
    media: Media,
    videoDimensions: VideoDimension[]
  ): Observable<boolean> {
    if (!media.fileName) return of(true);

    if (videoDimensions.length === 0) return this.removeVideoBlob$(media);

    return from(videoDimensions).pipe(
      switchMap((videoDimension) =>
        this.azureStorageProvider.deleteBlob$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(media.state),
          this.azureStorageProvider.getBlobPathWithDimension(
            media,
            videoDimension.type
          )
        )
      ),
      switchMapTo(this.removeVideoBlob$(media))
    );
  }
}
