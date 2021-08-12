import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  concatMapTo,
  from,
  Observable,
  of,
  tap,
} from 'rxjs';

import {
  MediaType,
  Video,
  VideoDimension,
  VideoUpdateDto,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  downloadBlobToFile$,
  exifVideo$,
  getBlobPath,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { loadMedia } from '../content/media.functions';
import { ConfigProvider } from './config.provider';
import { VideoDimensionProvider } from './video-dimension.provider';
import { VideoProvider } from './video.provider';
import { validateCanUpdateVideo } from '../content/video-validation.functions';

@Injectable()
export class VideoUpdateProvider {
  private readonly logger: Logger;
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider
  ) {
    this.logger = new Logger(VideoUpdateProvider.name);
  }

  update$(
    video: Video,
    videoUpdate: VideoUpdateDto,
    documentModel: DocumentModel,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    const validatedVideo = validateCanUpdateVideo(video);
    return this.videoProvider
      .setIsProcessing$(
        validatedVideo.id,
        validatedVideo.entityId,
        true,
        entityModel
      )
      .pipe(
        tap(() => this.logger.debug('Update video blob path')),
        concatMap(() => {
          const media = loadMedia(
            MediaType.Video,
            validatedVideo.id,
            validatedVideo.fileName,
            validatedVideo.state,
            documentModel
          );
          const mediaUpdate = loadMedia(
            MediaType.Video,
            video.id,
            videoUpdate.fileName,
            videoUpdate.state,
            documentModel
          );
          const updateBlobPathAndExif$ = this.updateBlobPathAndExif$(
            videoUpdate,
            media,
            mediaUpdate,
            documentModel.videoDimensions
          );
          return combineLatest([
            of(media),
            of(mediaUpdate),
            from(updateBlobPathAndExif$),
          ]);
        }),
        tap(() => this.logger.debug('Update')),
        concatMapTo(
          this.videoProvider.update$(
            video.id,
            video.entityId,
            videoUpdate,
            entityModel
          )
        ),
        concatMapTo(
          this.videoProvider.setIsProcessing$(
            video.id,
            video.entityId,
            false,
            entityModel
          )
        )
      );
  }

  updateBlobPathAndExif$(
    videoUpdate: VideoUpdateDto,
    videoMedia: Media,
    videoUpdateMedia: Media,
    videoDimensions: VideoDimension[]
  ): Observable<boolean> {
    return from(videoDimensions).pipe(
      concatMap((videoDimension) =>
        this.videoDimensionProvider.updateBlobPathAndExif$(
          videoUpdate,
          videoMedia,
          videoUpdateMedia,
          videoDimension
        )
      ),
      tap(() => this.logger.debug('Download video')),
      concatMapTo(
        downloadBlobToFile$(
          this.configProvider.getConnectionStringFromMediaState(
            videoMedia.state
          ),
          getBlobPath(videoMedia),
          videoMedia.fileName
        )
      ),
      tap(() => this.logger.debug(`Exif video with update`)),
      concatMap((filePath) =>
        exifVideo$(
          filePath,
          this.configProvider.getVideoArtistExif(new Date().getFullYear()),
          {
            title: videoUpdate.title,
            description: videoUpdate.description,
          }
        )
      ),
      tap(() => this.logger.debug('Upload video to new blob path')),
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getConnectionStringFromMediaState(
            videoUpdateMedia.state
          ),
          fs.createReadStream(filePath),
          getBlobPath(videoUpdateMedia)
        )
      ),
      tap(() => this.logger.debug('Remove video at previous blob path')),
      concatMap(() =>
        deleteBlob$(
          this.configProvider.getConnectionStringFromMediaState(
            videoMedia.state
          ),
          getBlobPath(videoMedia)
        )
      )
    );
  }
}
