import { Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { concatMap, concatMapTo, from, Observable, tap } from 'rxjs';

import {
  Image,
  ImageDimension,
  MediaType,
} from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import {
  deleteBlob$,
  getBlobPath,
  getBlobPathWithDimension,
} from '@dark-rush-photography/api/util';
import { loadMedia } from '../content/media.functions';
import { ConfigProvider } from './config.provider';
import { ImageProvider } from './image.provider';

@Injectable()
export class ImageRemoveProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageProvider: ImageProvider
  ) {
    this.logger = new Logger(ImageRemoveProvider.name);
  }

  remove$(
    image: Image,
    documentModel: DocumentModel,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    Logger.log('Removing image', ImageRemoveProvider.name);
    return this.imageProvider
      .setIsProcessing$(image.id, image.entityId, true, entityModel)
      .pipe(
        tap(() => this.logger.debug('Removing blobs')),
        concatMapTo(
          from(
            this.removeImageBlobs$(
              loadMedia(
                MediaType.Image,
                image.id,
                image.fileName,
                image.state,
                documentModel
              ),
              documentModel.imageDimensions
            )
          )
        ),
        tap(() => this.logger.debug('Removing data')),
        concatMapTo(
          from(
            this.imageProvider.remove$(image.id, image.entityId, entityModel)
          )
        ),
        tap(() =>
          Logger.log('Removing image completed', ImageRemoveProvider.name)
        )
      );
  }

  removeImageBlobs$(
    media: Media,
    imageDimensions: ImageDimension[]
  ): Observable<boolean> {
    if (imageDimensions.length === 0) {
      return deleteBlob$(
        this.configProvider.getConnectionStringFromMediaState(media.state),
        getBlobPath(media)
      );
    }

    return from(imageDimensions).pipe(
      concatMap((imageDimension) =>
        deleteBlob$(
          this.configProvider.getConnectionStringFromMediaState(media.state),
          getBlobPathWithDimension(media, imageDimension.type)
        )
      ),
      concatMapTo(
        deleteBlob$(
          this.configProvider.getConnectionStringFromMediaState(media.state),
          getBlobPath(media)
        )
      )
    );
  }
}
