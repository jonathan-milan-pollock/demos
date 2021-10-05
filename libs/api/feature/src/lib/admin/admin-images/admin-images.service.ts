import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable, of, pluck } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin, ImageUpdate } from '@dark-rush-photography/shared/types';
import {
  ImageUpdateProvider,
  Document,
  DocumentModel,
  validateEntityFound,
  validateImageFound,
  validateImageSelectedOrPublic,
  ImageStateChangeProvider,
  ContentRemoveProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImagesService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageUpdateProvider: ImageUpdateProvider,
    private readonly imageStateChangeProvider: ImageStateChangeProvider,
    private readonly contentRemoveProvider: ContentRemoveProvider
  ) {
    this.logger = new Logger(AdminImagesService.name);
  }

  update$(
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<ImageAdmin> {
    return this.imageUpdateProvider.update$(imageId, entityId, imageUpdate);
  }

  select$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return this.imageStateChangeProvider.select$(imageId, entityId);
  }

  archive$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return this.imageStateChangeProvider.archive$(imageId, entityId);
  }

  unarchive$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return this.imageStateChangeProvider.unarchive$(imageId, entityId);
  }

  remove$(imageId: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        return of(
          documentModel.images.find((image) => image.id === imageId)
        ).pipe(
          map(validateImageFound),
          map(validateImageSelectedOrPublic),
          pluck('id'),
          concatMap((imageId) =>
            this.contentRemoveProvider
              .removeImage$(imageId, entityId)
              .pipe(map(() => undefined))
          )
        );
      })
    );
  }
}
