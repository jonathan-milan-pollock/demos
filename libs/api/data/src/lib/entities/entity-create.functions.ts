import { Logger } from '@nestjs/common';

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
  createNewEntity$,
  findOneEntity$,
} from './entity-repository.functions';
import { loadNewEntity } from './entity-load-document-model.functions';
import { validateEntityNotAlreadyExists } from './entity-validation.functions';

export const createEntity$ = (
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug: string,
  entityModel: Model<DocumentModel>
): Observable<DocumentModel | null> => {
  return findOneEntity$(
    entityType,
    watermarkedType,
    group,
    slug,
    entityModel
  ).pipe(
    map(validateEntityNotAlreadyExists),
    concatMap(() =>
      createNewEntity$(
        loadNewEntity(entityType, watermarkedType, group, slug),
        entityModel
      )
    )
  );
};

export const createEntityForFolder$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string,
  entityModel: Model<DocumentModel>,
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug?: string
): Observable<void> => {
  const logger = new Logger(createEntityForFolder$.name);
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
            logger.log(
              `Found ${entityType} entity ${
                group !== DEFAULT_ENTITY_GROUP ? ` ${group}` : ''
              }${slug ?? entityFolder.name}`
            );
            return of(documentModel);
          }

          logger.log(
            `Creating ${entityType} entity ${
              group !== DEFAULT_ENTITY_GROUP ? ` ${group}` : ''
            }${slug ?? entityFolder.name}`
          );
          return createNewEntity$(
            loadNewEntity(
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
};
