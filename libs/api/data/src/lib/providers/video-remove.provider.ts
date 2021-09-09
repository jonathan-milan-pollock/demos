import { Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { concatMap, from, Observable, of, tap } from 'rxjs';

import { MediaType, Video } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  getAzureStorageBlobPath,
} from '@dark-rush-photography/api/util';
import { loadMedia } from '../content/media.functions';
import { ConfigProvider } from './config.provider';
import { VideoProvider } from './video.provider';

@Injectable()
export class VideoRemoveProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
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

    return this.removeVideoBlobs$(
      loadMedia(
        MediaType.Video,
        video.id,
        video.fileName,
        video.state,
        documentModel
      )
    ).pipe(
      concatMap(() =>
        from(this.videoProvider.remove$(video.id, video.entityId, entityModel))
      ),
      tap(() => this.logger.debug('Video removal completed'))
    );
  }

  removeVideoBlob$(media: Media): Observable<boolean> {
    return deleteBlob$(
      this.configProvider.getAzureStorageConnectionString(media.state),
      this.configProvider.azureStorageBlobContainerName,
      getAzureStorageBlobPath(media)
    );
  }

  removeVideoBlobs$(media: Media): Observable<boolean> {
    if (!media.fileName) return of(true);

    return this.removeVideoBlob$(media);
  }
}
