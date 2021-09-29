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
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  EntityMinimal,
  EntityWithoutGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFromEntityWithoutGroupType,
  getEntityWithoutGroupTypeFolderName,
  getEntityWithoutGroupTypeInitialSlug,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadEntityMinimal } from '../entities/entity-load.functions';
import { EntityCreateProvider } from './entity-create.provider';
import { findAllEntities$ } from '../entities/entity-find-all.functions';

@Injectable()
export class EntityProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly entityCreateProvider: EntityCreateProvider
  ) {
    this.logger = new Logger(EntityProvider.name);
  }

  findAll$(
    googleDrive: drive_v3.Drive,
    entityWithoutGroupType: EntityWithoutGroupType
  ): Observable<EntityMinimal[]> {
    const folderName = getEntityWithoutGroupTypeFolderName(
      entityWithoutGroupType
    );
    const initialSlug = getEntityWithoutGroupTypeInitialSlug(
      entityWithoutGroupType
    );
    return this.entityCreateProvider
      .create$(
        googleDrive,
        folderName,
        entityWithoutGroupType,
        WatermarkedType.Watermarked,
        initialSlug
      )
      .pipe(
        concatMap(() =>
          this.entityCreateProvider.create$(
            googleDrive,
            folderName,
            entityWithoutGroupType,
            WatermarkedType.WithoutWatermark,
            initialSlug
          )
        ),
        concatMap(() =>
          combineLatest([
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
          ])
        ),
        concatMap(([watermarkedEntities, withoutWatermarkEntities]) =>
          from([...watermarkedEntities, ...withoutWatermarkEntities])
        ),
        toArray<DocumentModel>(),
        concatMap((documentModels) => {
          if (documentModels.length === 0) return of([]);

          return from(documentModels).pipe(
            map(loadEntityMinimal),
            toArray<EntityMinimal>()
          );
        })
      );
  }
}
