import { Inject, Injectable, Logger } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';

import {
  ENV,
  Image,
  ImageDimension,
  Media,
} from '@dark-rush-photography/shared/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { ImageProvider } from './image.provider';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class ImageRemoveProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly imageProvider: ImageProvider,
    private readonly azureStorageProvider: AzureStorageProvider
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
        switchMapTo(
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
        switchMapTo(
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
    return this.azureStorageProvider.deleteBlob$(
      this.env.azureStorageConnectionString,
      this.azureStorageProvider.getAzureStorageType(media.state),
      this.azureStorageProvider.getBlobPath(media)
    );
  }

  removeImageBlobs$(
    media: Media,
    imageDimensions: ImageDimension[]
  ): Observable<boolean> {
    if (imageDimensions.length === 0) return this.removeImageBlob$(media);

    return from(imageDimensions).pipe(
      switchMap((imageDimension) =>
        this.azureStorageProvider.deleteBlob$(
          this.env.azureStorageConnectionString,
          this.azureStorageProvider.getAzureStorageType(media.state),
          this.azureStorageProvider.getBlobPathWithDimension(
            media,
            imageDimension.type
          )
        )
      ),
      switchMapTo(this.removeImageBlob$(media))
    );
  }
}
