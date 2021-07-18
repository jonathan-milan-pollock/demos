import { Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { concatMap, concatMapTo, from, Observable, of, tap } from 'rxjs';

import {
  MediaType,
  Video,
  VideoDimension,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  getBlobPath,
  getBlobPathWithDimension,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { MediaProvider } from './media.provider';
import { VideoProvider } from './video.provider';
import { Media } from '@dark-rush-photography/api/types';

@Injectable()
export class VideoRemoveProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly mediaProvider: MediaProvider,
    private readonly videoProvider: VideoProvider
  ) {
    this.logger = new Logger(VideoRemoveProvider.name);
  }

  remove$(
    video: Video,
    documentModel: DocumentModel,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    this.logger.debug('Video removal started');

    if (!video.fileName) {
      return of(documentModel);
    }

    return this.videoProvider
      .setIsProcessing$(video.id, video.entityId, true, entityModel)
      .pipe(
        concatMapTo(
          from(
            this.removeVideoBlobs$(
              this.mediaProvider.loadMedia(
                MediaType.Video,
                video.id,
                video.fileName,
                video.state,
                documentModel
              ),
              video.isUploaded,
              documentModel.videoDimensions
            )
          )
        ),
        concatMapTo(
          from(
            this.videoProvider.remove$(video.id, video.entityId, entityModel)
          )
        ),
        tap(() => this.logger.debug('Video removal completed'))
      );
  }

  removeVideoBlob$(media: Media, isUploaded: boolean): Observable<boolean> {
    if (!isUploaded) return of(true);

    return deleteBlob$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getBlobPath(media)
    );
  }

  removeVideoBlobs$(
    media: Media,
    isUploaded: boolean,
    videoDimensions: VideoDimension[]
  ): Observable<boolean> {
    if (!media.fileName) return of(true);

    if (videoDimensions.length === 0)
      return this.removeVideoBlob$(media, isUploaded);

    return from(videoDimensions).pipe(
      concatMap((videoDimension) =>
        deleteBlob$(
          this.configProvider.getConnectionStringFromMediaState(media.state),
          getBlobPathWithDimension(media, videoDimension.type)
        )
      ),
      concatMapTo(this.removeVideoBlob$(media, isUploaded))
    );
  }
}
