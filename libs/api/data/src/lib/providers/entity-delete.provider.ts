import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { Document, DocumentModel } from '../schema/document.schema';
import {
  findEntityById$,
  findEntityByIdAndDelete$,
} from '../entities/entity-repository.functions';
import { ContentRemoveProvider } from './content-remove.provider';

@Injectable()
export class EntityDeleteProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentRemoveProvider: ContentRemoveProvider
  ) {}

  delete$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        return this.contentRemoveProvider.removeAllImages$(entityId).pipe(
          concatMap(() =>
            this.contentRemoveProvider.removeAllVideos$(entityId)
          ),
          concatMap(() => findEntityByIdAndDelete$(entityId, this.entityModel)),
          map(() => undefined)
        );
      })
    );
  }
}
