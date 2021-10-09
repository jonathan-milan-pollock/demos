import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  from,
  map,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityMinimalAdmin,
  EntityWithGroupType,
  EntityWithoutGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromEntityWithGroupType,
  getEntityTypeFromEntityWithoutGroupType,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  findAllEntities$,
  findAllEntitiesForGroup$,
} from '../entities/entity-repository.functions';
import { loadEntityMinimalAdmin } from '../entities/entity-load-admin.functions';

@Injectable()
export class EntityFindAllProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findAllEntities$(
    entityWithoutGroupType: EntityWithoutGroupType
  ): Observable<EntityMinimalAdmin[]> {
    return combineLatest([
      findAllEntities$(
        getEntityTypeFromEntityWithoutGroupType(entityWithoutGroupType),
        WatermarkedType.Watermarked,
        this.entityModel
      ),
      findAllEntities$(
        getEntityTypeFromEntityWithoutGroupType(entityWithoutGroupType),
        WatermarkedType.WithoutWatermark,
        this.entityModel
      ),
    ]).pipe(
      concatMap(([watermarkedEntities, withoutWatermarkEntities]) =>
        from([...watermarkedEntities, ...withoutWatermarkEntities])
      ),
      toArray<DocumentModel>(),
      concatMap((documentModels) => {
        if (documentModels.length === 0) return of([]);

        return from(documentModels).pipe(
          map(loadEntityMinimalAdmin),
          toArray<EntityMinimalAdmin>()
        );
      })
    );
  }

  findAllEntitiesForGroup$(
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<EntityMinimalAdmin[]> {
    return combineLatest([
      findAllEntitiesForGroup$(
        getEntityTypeFromEntityWithGroupType(entityWithGroupType),
        WatermarkedType.Watermarked,
        group,
        this.entityModel
      ),
      findAllEntitiesForGroup$(
        getEntityTypeFromEntityWithGroupType(entityWithGroupType),
        WatermarkedType.WithoutWatermark,
        group,
        this.entityModel
      ),
    ]).pipe(
      concatMap(([watermarkedEntities, withoutWatermarkEntities]) =>
        from([...watermarkedEntities, ...withoutWatermarkEntities])
      ),
      toArray<DocumentModel>(),
      concatMap((documentModels) => {
        if (documentModels.length === 0) return of([]);

        return from(documentModels).pipe(
          map(loadEntityMinimalAdmin),
          toArray<EntityMinimalAdmin>()
        );
      })
    );
  }
}
