import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import {
  EntityAdmin,
  EntityWithGroupType,
  EntityWithoutGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromEntityWithGroupType,
  getEntityTypeFromEntityWithoutGroupType,
} from '@dark-rush-photography/shared/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  findAllEntities$,
  findAllEntitiesForWatermarkedGroup$,
} from '../entities/entity-repository.functions';
import { loadEntityAdmin } from '../entities/entity-load-admin.functions';

@Injectable()
export class EntityFindAllProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findAllEntities$(
    entityWithoutGroupType: EntityWithoutGroupType
  ): Observable<EntityAdmin[]> {
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
      map((documentModels) =>
        documentModels.length === 0 ? [] : documentModels.map(loadEntityAdmin)
      )
    );
  }

  findAllEntitiesForGroup$(
    entityWithGroupType: EntityWithGroupType,
    group: string
  ): Observable<EntityAdmin[]> {
    return combineLatest([
      findAllEntitiesForWatermarkedGroup$(
        getEntityTypeFromEntityWithGroupType(entityWithGroupType),
        WatermarkedType.Watermarked,
        group,
        this.entityModel
      ),
      findAllEntitiesForWatermarkedGroup$(
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
      map((documentModels) =>
        documentModels.length === 0 ? [] : documentModels.map(loadEntityAdmin)
      )
    );
  }
}
