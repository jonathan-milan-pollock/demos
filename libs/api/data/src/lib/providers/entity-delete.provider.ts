import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { Document, DocumentModel } from '../schema/document.schema';
import {
  findEntityById$,
  findEntityByIdAndDelete$,
} from '../entities/entity-repository.functions';
import { ImageRemoveAllProvider } from './image-remove-all.provider';
import { ImageRemoveOneProvider } from './image-remove-one.provider';

@Injectable()
export class EntityDeleteProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageRemoveAllProvider: ImageRemoveAllProvider,
    private readonly imageRemoveOneProvider: ImageRemoveOneProvider
  ) {}

  deleteEntity$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        return this.imageRemoveAllProvider.removeAllImages$(entityId).pipe(
          concatMap(() =>
            this.imageRemoveOneProvider.removeImageVideo$(entityId)
          ),
          concatMap(() => findEntityByIdAndDelete$(entityId, this.entityModel)),
          map(() => undefined)
        );
      })
    );
  }
}
