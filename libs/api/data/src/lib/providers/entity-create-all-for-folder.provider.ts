import { Injectable } from '@nestjs/common';

import { concatMap, from, last, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { findGoogleDriveFolders$ } from '@dark-rush-photography/api/util';
import { EntityCreateOneForFolderProvider } from './entity-create-one-for-folder.provider';

@Injectable()
export class EntityCreateAllForFolderProvider {
  constructor(
    private readonly entityCreateOneForFolderProvider: EntityCreateOneForFolderProvider
  ) {}

  createAllEntitiesForFolder$(
    googleDrive: drive_v3.Drive,
    folderId: string,
    entityType: EntityType,
    watermarkedType: WatermarkedType,
    group: string,
    initialSlug?: string
  ): Observable<void> {
    return findGoogleDriveFolders$(googleDrive, folderId).pipe(
      concatMap((entityFolders) => {
        if (entityFolders.length === 0) return of(undefined);

        return from(entityFolders).pipe(
          concatMap((entityFolder) =>
            this.entityCreateOneForFolderProvider.createOneEntityForFolder$(
              entityFolder,
              entityType,
              watermarkedType,
              group,
              initialSlug
            )
          )
        );
      }),
      last()
    );
  }
}
