import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  concatMap,
  from,
  last,
  map,
  max,
  Observable,
  of,
  pluck,
  take,
} from 'rxjs';
import { Model } from 'mongoose';

import { EntityOrders, EntityType } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  findAllEntitiesForType$,
  findByIdAndUpdateOrder$,
} from '../entities/entity-repository.functions';

@Injectable()
export class EntityOrderProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  order$(
    entityType: EntityType,
    group: string,
    entityOrders: EntityOrders
  ): Observable<void> {
    if (entityOrders.entityIds.length === 0) return of(undefined);

    return from(entityOrders.entityIds).pipe(
      concatMap((entityId) => {
        return findAllEntitiesForType$(
          entityType,
          group,
          this.entityModel
        ).pipe(
          concatMap((documentModels) => {
            if (documentModels.length === 0) return of(0);

            return from(documentModels).pipe(pluck('order'), max(), take(1));
          }),
          concatMap((maxOrder) =>
            findByIdAndUpdateOrder$(entityId, maxOrder + 1, this.entityModel)
          )
        );
      }),
      last(),
      map(() => undefined)
    );
  }
}
