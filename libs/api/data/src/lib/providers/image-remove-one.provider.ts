import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of, tap } from 'rxjs';
import { Model } from 'mongoose';

import { Image } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';
import {
  removeImage$,
  removeImageVideo$,
} from '../images/image-repository.functions';
import { ImageDeleteBlobsProvider } from './image-delete-blobs.provider';

@Injectable()
export class ImageRemoveOneProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageDeleteBlobsProvider: ImageDeleteBlobsProvider
  ) {
    this.logger = new Logger(ImageRemoveOneProvider.name);
  }

  removeImage$(image: Image): Observable<void> {
    return this.imageDeleteBlobsProvider
      .deleteImageBlobs$(image.storageId, image.fileName)
      .pipe(
        concatMap(() => findEntityById$(image.entityId, this.entityModel)),
        map(validateEntityFound),
        tap(() =>
          this.logger.log(
            `Removing image ${image.id} from entity ${image.entityId}`
          )
        ),
        concatMap((documentModel) =>
          removeImage$(image, documentModel, this.entityModel)
        ),
        map(() => undefined)
      );
  }

  removeImageVideo$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const imageVideo = documentModel.imageVideo;
        if (!imageVideo) return of(undefined);

        if (imageVideo.storageId === '' || imageVideo.fileName === '') {
          return of(undefined);
        }

        return this.imageDeleteBlobsProvider.deleteImageVideoBlob$(
          imageVideo.storageId,
          imageVideo.fileName
        );
      }),
      concatMap(() => findEntityById$(entityId, this.entityModel)),
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        this.logger.log(`Removing image video from entity ${entityId}`);
        return removeImageVideo$(entityId, this.entityModel);
      }),
      map(() => undefined)
    );
  }
}
