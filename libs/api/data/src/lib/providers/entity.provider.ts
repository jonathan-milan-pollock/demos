import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, Observable, of, toArray } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getEntityTypeFolderName,
  getEntityTypeInitialSlug,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity.functions';
import { EntityCreateProvider } from './entity-create.provider';

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

  create$(
    googleDrive: drive_v3.Drive,
    entityType: EntityType
  ): Observable<void> {
    const folderName = getEntityTypeFolderName(entityType);
    const initialSlug = getEntityTypeInitialSlug(entityType);

    return this.entityCreateProvider
      .create$(
        googleDrive,
        folderName,
        entityType,
        WatermarkedType.Watermarked,
        initialSlug
      )
      .pipe(
        concatMap(() =>
          this.entityCreateProvider.create$(
            googleDrive,
            folderName,
            entityType,
            WatermarkedType.WithoutWatermark,
            initialSlug
          )
        )
      );
  }

  findAll$(entityType: EntityType): Observable<DocumentModel[]> {
    return of(entityType).pipe(
      concatMap(() =>
        combineLatest([
          this.entityModel.find({
            type: entityType,
            watermarkedType: WatermarkedType.Watermarked,
          }),
          this.entityModel.find({
            type: entityType,
            watermarkedType: WatermarkedType.WithoutWatermark,
          }),
        ])
      ),
      concatMap(([watermarkedImagePosts, withoutWatermarkImagePosts]) =>
        from([
          ...loadDocumentModelsArray(watermarkedImagePosts),
          ...loadDocumentModelsArray(withoutWatermarkImagePosts),
        ])
      ),
      toArray<DocumentModel>()
    );
  }
}
