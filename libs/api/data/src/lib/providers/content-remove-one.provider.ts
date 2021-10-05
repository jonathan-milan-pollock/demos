import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Image, Video } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  removeImageFromEntity$,
  removeVideoFromEntity$,
} from '../entities/entity-repository.functions';
import { ContentDeleteBlobsProvider } from './content-delete-blobs.provider';

@Injectable()
export class ContentRemoveOneProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentDeleteBlobsProvider: ContentDeleteBlobsProvider
  ) {}

  removeImage$(
    entityId: string,
    image: Image,
    documentModel: DocumentModel
  ): Observable<void> {
    return this.contentDeleteBlobsProvider
      .deleteImageBlobs$(image.storageId, image.fileName)
      .pipe(
        concatMap(() =>
          removeImageFromEntity$(
            image.id,
            entityId,
            documentModel,
            this.entityModel
          )
        ),
        map(() => undefined)
      );
  }

  removeVideo$(
    entityId: string,
    video: Video,
    documentModel: DocumentModel
  ): Observable<void> {
    return this.contentDeleteBlobsProvider
      .deleteVideoBlob$(video.storageId, video.fileName)
      .pipe(
        concatMap(() =>
          removeVideoFromEntity$(
            video.id,
            entityId,
            documentModel,
            this.entityModel
          )
        ),
        map(() => undefined)
      );
  }
}
