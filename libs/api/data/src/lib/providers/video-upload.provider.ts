import { Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  concatMapTo,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';

import { VideoDimensionType } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  downloadBlobToFile$,
  findVideoExifDateCreated$,
  getBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { VideoDimensionProvider } from './video-dimension.provider';
import { VideoProvider } from './video.provider';

@Injectable()
export class VideoUploadProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider
  ) {
    this.logger = new Logger(VideoUploadProvider.name);
  }

  upload$(
    media: Media,
    isThreeSixty: boolean,
    file: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    const youTubeResolution = isThreeSixty
      ? this.configProvider.findThreeSixtyVideoResolution(
          VideoDimensionType.ThreeSixtyYouTube
        )
      : this.configProvider.findVideoResolution(VideoDimensionType.YouTube);

    return uploadBufferToBlob$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      file.buffer,
      getBlobPath(media)
    ).pipe(
      tap(() => this.logger.debug('Update date video created')),
      concatMapTo(this.updateDateCreated$(media, entityModel)),
      tap(() => this.logger.debug('Resize video')),
      concatMapTo(
        this.videoDimensionProvider.resize$(
          media,
          youTubeResolution,
          entityModel
        )
      ),
      concatMapTo(
        this.videoProvider.setIsProcessing$(
          media.id,
          media.entityId,
          false,
          entityModel
        )
      )
    );
  }

  updateDateCreated$(
    media: Media,
    entityModel: Model<DocumentModel>
  ): Observable<string> {
    return downloadBlobToFile$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => findVideoExifDateCreated$(filePath, new Date())),
      concatMap((dateCreated) =>
        combineLatest([
          of(dateCreated),
          this.videoProvider.setDateCreated$(
            media.id,
            media.entityId,
            dateCreated,
            entityModel
          ),
        ])
      ),
      map(([dateCreated]) => dateCreated)
    );
  }
}
