import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { concatMap, concatMapTo, tap } from 'rxjs/operators';

import {
  Media,
  Video,
  VideoDimension,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import {
  deleteBlob$,
  getAzureStorageTypeFromMediaState,
  getBlobPath,
  getBlobPathWithDimension,
} from '@dark-rush-photography/shared-server/util';
import { DocumentModel } from '../schema/document.schema';
import { VideoProvider } from './video.provider';

@Injectable()
export class VideoRemoveProvider {
  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly videoProvider: VideoProvider
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
        concatMapTo(
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
        concatMapTo(
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
    return deleteBlob$(
      this.configService.get<Env>('privateBlobConnectionString', {
        infer: true,
      }),
      getAzureStorageTypeFromMediaState(media.state),
      getBlobPath(media)
    );
  }

  removeVideoBlobs$(
    media: Media,
    videoDimensions: VideoDimension[]
  ): Observable<boolean> {
    if (!media.fileName) return of(true);

    if (videoDimensions.length === 0) return this.removeVideoBlob$(media);

    return from(videoDimensions).pipe(
      concatMap((videoDimension) =>
        deleteBlob$(
          this.configService.get<Env>('privateBlobConnectionString', {
            infer: true,
          }),
          getAzureStorageTypeFromMediaState(media.state),
          getBlobPathWithDimension(media, videoDimension.type)
        )
      ),
      concatMapTo(this.removeVideoBlob$(media))
    );
  }
}
