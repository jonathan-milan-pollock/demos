import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { ImageState } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ContentRemoveOneProvider } from './content-remove-one.provider';

@Injectable()
export class ContentRemoveProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentRemoveOneProvider: ContentRemoveOneProvider
  ) {}

  removeAllImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (documentModel.images.length === 0) return of(undefined);

        return from([...documentModel.images]).pipe(
          concatMap((image) =>
            this.contentRemoveOneProvider.removeImage$(image)
          ),
          last(),
          map(() => undefined)
        );
      })
    );
  }

  removeAllImagesForState$(
    state: ImageState,
    entityId: string
  ): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const imagesForState = documentModel.images.filter(
          (image) => image.state === state
        );
        if (imagesForState.length === 0) return of(undefined);

        return from([...imagesForState]).pipe(
          concatMap((imageForState) =>
            this.contentRemoveOneProvider.removeImage$(imageForState)
          ),
          last(),
          map(() => undefined)
        );
      })
    );
  }

  removeImage$(imageId: string, entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const image = documentModel.images.find(
          (image) => image.id === imageId
        );
        if (!image) return of(undefined);

        return this.contentRemoveOneProvider
          .removeImage$(image)
          .pipe(map(() => undefined));
      })
    );
  }

  removeAllVideos$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (documentModel.videos.length === 0) return of(undefined);

        return from(documentModel.videos).pipe(
          concatMap((video) =>
            this.contentRemoveOneProvider.removeVideo$(video)
          ),
          last(),
          map(() => undefined)
        );
      })
    );
  }
}
