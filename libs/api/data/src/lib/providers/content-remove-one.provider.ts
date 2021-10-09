import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, tap } from 'rxjs';
import { Model } from 'mongoose';

import { Image, Video } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  removeImage$,
  removeVideo$,
} from '../content/content-repository.functions';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

@Injectable()
export class ContentRemoveOneProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentDeleteBlobsProvider: ContentDeleteBlobsProvider
  ) {
    this.logger = new Logger(ContentRemoveOneProvider.name);
  }

  removeImage$(image: Image): Observable<void> {
    return this.contentDeleteBlobsProvider
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

  removeVideo$(video: Video): Observable<void> {
    return this.contentDeleteBlobsProvider
      .deleteVideoBlob$(video.storageId, video.fileName)
      .pipe(
        concatMap(() => findEntityById$(video.entityId, this.entityModel)),
        map(validateEntityFound),
        tap(() =>
          this.logger.log(
            `Removing video ${video.id} from entity ${video.entityId}`
          )
        ),
        concatMap((documentModel) =>
          removeVideo$(video, documentModel, this.entityModel)
        ),
        map(() => undefined)
      );
  }
}
