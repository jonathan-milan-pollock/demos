import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMap, from, map, Observable, of } from 'rxjs';

import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateImageSelectedOrPublic } from '../content/content-validation.functions';
import { ContentRemoveProvider } from './content-remove.provider';

@Injectable()
export class ImageRemoveProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentRemoveProvider: ContentRemoveProvider
  ) {}

  removeImage$(imageId: string, entityId: string): Observable<void> {
    return from(findEntityById$(entityId, this.entityModel)).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        const image = documentModel.images.find(
          (image) => image.id === imageId
        );
        if (!image) return of(undefined);

        validateImageSelectedOrPublic(image);

        return this.contentRemoveProvider
          .removeImage$(imageId, entityId)
          .pipe(map(() => undefined));
      })
    );
  }
}
