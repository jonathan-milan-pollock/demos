import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { EntityOrders } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityByIdAndUpdateOrder$ } from '../entities/entity-repository.functions';

@Injectable()
export class EntityOrderProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  order$(entityOrders: EntityOrders): Observable<void> {
    if (entityOrders.entityIdOrders.length === 0) return of(undefined);

    return from(entityOrders.entityIdOrders).pipe(
      concatMap(({ entityId, order }) =>
        findEntityByIdAndUpdateOrder$(entityId, order, this.entityModel)
      ),
      last(),
      map(() => undefined)
    );
  }
}
