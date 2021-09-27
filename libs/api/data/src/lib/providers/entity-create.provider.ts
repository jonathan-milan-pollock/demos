import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
  EntityWithGroupType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolderByName$,
  getEntityTypeFromEntityWithGroupType,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { createEntity$ } from '../entities/entity-create.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class EntityCreateProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(EntityCreateProvider.name);
  }

  create$(
    googleDrive: drive_v3.Drive,
    folderName: string,
    entityType: EntityType,
    watermarkedType: WatermarkedType,
    slug?: string
  ): Observable<void> {
    return from(
      findGoogleDriveFolderByName$(
        googleDrive,
        this.configProvider.getGoogleDriveWebsitesFolderId(watermarkedType),
        folderName
      )
    ).pipe(
      concatMap((folder) => {
        if (!folder) return of(undefined);

        return createEntity$(
          googleDrive,
          folder.id,
          this.entityModel,
          entityType,
          watermarkedType,
          DEFAULT_ENTITY_GROUP,
          slug
        ).pipe(
          last(),
          map(() => undefined)
        );
      })
    );
  }

  createForGroup$(
    googleDrive: drive_v3.Drive,
    folderName: string,
    entityWithGroupType: EntityWithGroupType,
    watermarkedType: WatermarkedType,
    group: string
  ): Observable<void> {
    return from(
      findGoogleDriveFolderByName$(
        googleDrive,
        this.configProvider.getGoogleDriveWebsitesFolderId(watermarkedType),
        folderName
      )
    ).pipe(
      concatMap((folder) => {
        if (!folder) return of(undefined);

        return findGoogleDriveFolderByName$(googleDrive, folder.id, group).pipe(
          concatMap((groupFolder) => {
            if (!groupFolder) return of(undefined);

            return createEntity$(
              googleDrive,
              groupFolder.id,
              this.entityModel,
              getEntityTypeFromEntityWithGroupType(entityWithGroupType),
              watermarkedType,
              group
            ).pipe(
              last(),
              map(() => undefined)
            );
          })
        );
      })
    );
  }
}
