import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { getEntityTypeHasImageVideo } from '@dark-rush-photography/shared/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { loadAddImageVideo } from '../images/image-load-document-model.functions';
import { addImageVideo$ } from '../images/image-repository.functions';
import {
  findLovedPublishImages,
  findStarredPublishImage,
} from '../images/image-load.functions';
import { ImageVideoMeltProvider } from './image-video-melt.provider';
import { ImageVideoFfmpegExifProvider } from './image-video-ffmpeg-exif.provider';
import { ImageVideoFfmpegFrontCoverProvider } from './image-video-ffmpeg-front-cover.provider';

@Injectable()
export class ImageVideoPublishProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageVideoMeltProvider: ImageVideoMeltProvider,
    private readonly imageVideoFfmpegExifProvider: ImageVideoFfmpegExifProvider,
    private readonly imageVideoFfmpegFrontCoverProvider: ImageVideoFfmpegFrontCoverProvider
  ) {}

  publishImageVideo$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (!getEntityTypeHasImageVideo(documentModel.type)) {
          return of(undefined);
        }

        const imageVideo = loadAddImageVideo(documentModel.pathname);

        const starredPublishImage = findStarredPublishImage(
          documentModel.images
        );
        if (!starredPublishImage) {
          throw new ConflictException(
            'Unable to find starred publish image for image video'
          );
        }

        const emotionImages = [
          starredPublishImage,
          ...findLovedPublishImages(documentModel.images),
        ];
        return this.imageVideoMeltProvider
          .meltImageVideo$(imageVideo, emotionImages)
          .pipe(
            concatMap(() =>
              this.imageVideoFfmpegExifProvider.ffmpegExifImageVideo$(
                imageVideo,
                documentModel
              )
            ),
            concatMap(() =>
              this.imageVideoFfmpegFrontCoverProvider.ffmpegFrontCoverImageVideo$(
                imageVideo,
                starredPublishImage
              )
            ),
            concatMap(() =>
              addImageVideo$(imageVideo, documentModel._id, this.entityModel)
            )
          );
      }),
      map(() => undefined)
    );
  }
}
