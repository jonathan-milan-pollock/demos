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
  Image,
  ImageDimension,
  MediaType,
  Location,
  ImageUpdateDto,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  downloadBlobToFile$,
  exifImage$,
  getBlobPath,
  getExifDate,
  getImageExif,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { loadMedia } from '../content/media.functions';
import { ConfigProvider } from './config.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { ImageProvider } from './image.provider';

@Injectable()
export class ImageUpdateProvider {
  private readonly logger: Logger;
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {
    this.logger = new Logger(ImageUpdateProvider.name);
  }

  update$(
    image: Image,
    imageUpdate: ImageUpdateDto,
    documentModel: DocumentModel,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return this.imageProvider
      .setIsProcessing$(image.id, image.entityId, true, entityModel)
      .pipe(
        tap(() => this.logger.debug('Update image blob path')),
        concatMap(() => {
          const media = loadMedia(
            MediaType.Image,
            image.id,
            image.fileName,
            image.state,
            documentModel
          );
          const mediaUpdate = loadMedia(
            MediaType.Image,
            image.id,
            imageUpdate.fileName,
            imageUpdate.state,
            documentModel
          );
          const updateBlobPathAndExif$ = this.updateBlobPathAndExif$(
            image,
            imageUpdate,
            media,
            mediaUpdate,
            documentModel.imageDimensions,
            documentModel.location
          );
          return combineLatest([
            of(media),
            of(mediaUpdate),
            from(updateBlobPathAndExif$),
          ]);
        }),
        tap(() => this.logger.debug('Update')),
        concatMapTo(
          this.imageProvider.update$(
            image.id,
            image.entityId,
            imageUpdate,
            entityModel
          )
        ),
        concatMapTo(
          this.imageProvider.setIsProcessing$(
            image.id,
            image.entityId,
            false,
            entityModel
          )
        )
      );
  }

  updateBlobPathAndExif$(
    image: Image,
    imageUpdate: ImageUpdateDto,
    imageMedia: Media,
    imageUpdateMedia: Media,
    imageDimensions: ImageDimension[],
    location?: Location
  ): Observable<boolean> {
    return from(imageDimensions)
      .pipe(
        concatMap((imageDimension) =>
          this.imageDimensionProvider.updateBlobPathAndExif$(
            image,
            imageUpdate,
            imageMedia,
            imageUpdateMedia,
            imageDimension,
            location
          )
        )
      )
      .pipe(
        tap(() => this.logger.debug('Download image')),
        concatMapTo(
          downloadBlobToFile$(
            this.configProvider.getConnectionStringFromMediaState(
              imageMedia.state
            ),
            getBlobPath(imageMedia),
            imageMedia.fileName
          )
        ),
        tap(() => this.logger.debug('Exif image with update')),
        concatMap((filePath) =>
          exifImage$(
            filePath,
            this.configProvider.getImageArtistExif(
              new Date().getFullYear(),
              image.dateCreated ?? getExifDate(new Date())
            ),
            getImageExif(
              imageUpdate.datePublished ?? getExifDate(new Date()),
              imageUpdate.title,
              imageUpdate.description,
              imageUpdate.keywords,
              location
            )
          )
        ),
        tap(() => this.logger.debug('Upload image to new blob path')),
        concatMap((filePath) =>
          uploadStreamToBlob$(
            this.configProvider.getConnectionStringFromMediaState(
              imageUpdateMedia.state
            ),
            fs.createReadStream(filePath),
            getBlobPath(imageUpdateMedia)
          )
        ),
        tap(() => this.logger.debug('Remove image at previous blob path')),
        concatMap(() =>
          deleteBlob$(
            this.configProvider.getConnectionStringFromMediaState(
              imageMedia.state
            ),
            getBlobPath(imageMedia)
          )
        )
      );
  }
}
