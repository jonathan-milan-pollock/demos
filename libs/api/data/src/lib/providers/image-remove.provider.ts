import { Inject, Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { concatMap, concatMapTo, tap } from 'rxjs/operators';

import {
  ENV,
  Image,
  ImageDimension,
  Media,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import {
  deleteBlob$,
  getAzureStorageTypeFromMediaState,
  getBlobPath,
  getBlobPathWithDimension,
} from '@dark-rush-photography/shared-server/util';

@Injectable()
export class ImageRemoveProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly imageProvider: ImageProvider
  ) {}

  remove$(
    image: Image,
    documentModel: DocumentModel,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    Logger.log('Removing image', ImageRemoveProvider.name);
    return this.imageProvider
      .setIsProcessing$(image.id, image.entityId, true, entityModel)
      .pipe(
        tap(() => Logger.log('Removing blobs', ImageRemoveProvider.name)),
        concatMapTo(
          from(
            this.removeImageBlobs$(
              this.imageProvider.getMedia(
                image.id,
                image.fileName,
                image.state,
                documentModel
              ),
              documentModel.imageDimensions
            )
          )
        ),
        tap(() => Logger.log('Removing data', ImageRemoveProvider.name)),
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

  removeImageBlob$(media: Media): Observable<boolean> {
    return deleteBlob$(
      this.env.azureStorageConnectionString,
      getAzureStorageTypeFromMediaState(media.state),
      getBlobPath(media)
    );
  }

  removeImageBlobs$(
    media: Media,
    imageDimensions: ImageDimension[]
  ): Observable<boolean> {
    if (imageDimensions.length === 0) return this.removeImageBlob$(media);

    return from(imageDimensions).pipe(
      concatMap((imageDimension) =>
        deleteBlob$(
          this.env.azureStorageConnectionString,
          getAzureStorageTypeFromMediaState(media.state),
          getBlobPathWithDimension(media, imageDimension.type)
        )
      ),
      concatMapTo(this.removeImageBlob$(media))
    );
  }
}
