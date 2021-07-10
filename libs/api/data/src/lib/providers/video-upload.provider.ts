import { Inject, Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { concatMap, concatMapTo, mapTo, tap } from 'rxjs/operators';

import { ENV, Media } from '@dark-rush-photography/shared/types';
import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { VideoProvider } from './video.provider';
import { VideoDimensionProvider } from './video-dimension.provider';
import {
  getBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/shared-server/util';

@Injectable()
export class VideoUploadProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly videoProvider: VideoProvider,
    private readonly videoDimensionProvider: VideoDimensionProvider
  ) {}

  upload$(
    media: Media,
    file: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    Logger.log('Uploading video', VideoUploadProvider.name);
    return from(
      uploadBufferToBlob$(
        this.env.privateBlobConnectionString,
        AzureStorageType.Private,
        file.buffer,
        getBlobPath(media)
      )
    ).pipe(
      tap(() => Logger.log('Update date created', VideoUploadProvider.name)),
      concatMapTo(from(this.updateDateCreated$(media, entityModel))),
      tap(() => Logger.log('Exif video', VideoUploadProvider.name)),
      tap(() => Logger.log('Resize video', VideoUploadProvider.name)),
      concatMapTo(
        from(this.videoDimensionProvider.resizeVideo$(media, entityModel))
      ),
      concatMapTo(
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
    return of();
    /*  return this.VideoProvider
      .FindDateVideoCreated$({
        video: media,
      })
      .pipe(
        concatMap((dateCreated) =>
          this.videoProvider.setDateCreated$(
            media.id,
            media.entityId,
            dateCreated,
            entityModel
          )
        ),
        mapTo(media)
      );*/
  }
}
