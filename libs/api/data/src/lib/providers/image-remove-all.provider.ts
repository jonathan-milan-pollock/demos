import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { ImageState } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';
import { ImageRemoveOneProvider } from './image-remove-one.provider';

@Injectable()
export class ImageRemoveAllProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageRemoveOneProvider: ImageRemoveOneProvider
  ) {}

  removeAllImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (documentModel.images.length === 0) return of(undefined);

        return from(documentModel.images).pipe(
          concatMap((image) => this.imageRemoveOneProvider.removeImage$(image)),
          last(),
          map(() => undefined)
        );
      })
    );
  }

  removeAllNewImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const imagesForState = documentModel.images.filter(
          (image) => image.state === ImageState.New
        );
        if (imagesForState.length === 0) return of(undefined);

        return from([...imagesForState]).pipe(
          concatMap((imageForState) =>
            this.imageRemoveOneProvider.removeImage$(imageForState)
          ),
          last(),
          map(() => undefined)
        );
      })
    );
  }
}
