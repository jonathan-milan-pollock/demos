import { Injectable, Logger } from '@nestjs/common';

import {
  combineLatest,
  concatMap,
  from,
  last,
  map,
  Observable,
  of,
} from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { findGoogleDriveFolders$ } from '@dark-rush-photography/api/util';
import { DocumentModel } from '../schema/document.schema';
import {
  createEntity$ as createNewEntity$,
  findOneEntity$,
} from '../entities/entity-repository.functions';
import { loadCreateEntity } from '../entities/entity-load-document-model.functions';

@Injectable()
export class EntityCreateForFolderProvider {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(EntityCreateForFolderProvider.name);
  }

  createEntityForFolder$(
    googleDrive: drive_v3.Drive,
    parentFolderId: string,
    entityModel: Model<DocumentModel>,
    entityType: EntityType,
    watermarkedType: WatermarkedType,
    group: string,
    slug?: string
  ): Observable<void> {
    return findGoogleDriveFolders$(googleDrive, parentFolderId).pipe(
      concatMap((entityFolders) => {
        if (entityFolders.length === 0) return of(undefined);

        return from(entityFolders).pipe(
          concatMap((entityFolder) =>
            combineLatest([
              of(entityFolder),
              findOneEntity$(
                entityType,
                watermarkedType,
                group,
                slug ?? entityFolder.name,
                entityModel
              ),
            ])
          ),
          concatMap(([entityFolder, documentModel]) => {
            if (documentModel) {
              this.logger.log(
                `Found ${entityType} entity ${
                  group !== DEFAULT_ENTITY_GROUP ? ` ${group}` : ''
                }${slug ?? entityFolder.name}`
              );
              return of(documentModel);
            }

            this.logger.log(
              `Creating ${entityType} entity ${
                group !== DEFAULT_ENTITY_GROUP ? ` ${group}` : ''
              }${slug ?? entityFolder.name}`
            );
            return createNewEntity$(
              loadCreateEntity(
                entityType,
                watermarkedType,
                group,
                slug ?? entityFolder.name,
                entityFolder.id
              ),
              entityModel
            );
          })
        );
      }),
      last(),
      map(() => undefined)
    );
  }
}
