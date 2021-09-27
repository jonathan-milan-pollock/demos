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
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { findGoogleDriveFolders$ } from '@dark-rush-photography/api/util';
import { DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';

export const createWithEntityParentFolderId$ = (
  entityModel: Model<DocumentModel>,
  googleDrive: drive_v3.Drive,
  parentFolderId: string,
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug?: string
): Observable<void> => {
  const logger = new Logger(createWithEntityParentFolderId$.name);
  return findGoogleDriveFolders$(googleDrive, parentFolderId).pipe(
    concatMap((entityFolders) => {
      if (entityFolders.length === 0) return of(undefined);

      return from(entityFolders).pipe(
        concatMap((entityFolder) =>
          combineLatest([
            of(entityFolder),
            from(
              entityModel.find({
                type: entityType,
                group,
                slug: slug ?? entityFolder.name,
              })
            ),
          ])
        ),
        concatMap(([entityFolder, documentModels]) => {
          const entityName = slug ?? entityFolder.name;
          const documentModelsArray = loadDocumentModelsArray(documentModels);
          if (documentModelsArray.length > 0) {
            logger.log(
              `Found ${entityType} entity ${
                group !== DEFAULT_ENTITY_GROUP ? group : ''
              } ${entityName}`
            );
            return of(documentModelsArray[0]);
          }

          logger.log(
            `Creating ${entityType} entity ${
              group !== DEFAULT_ENTITY_GROUP ? group : ''
            } ${entityName}`
          );
          return from(
            new entityModel({
              ...loadNewEntity(
                entityType,
                watermarkedType,
                group,
                entityName,
                entityFolder.id
              ),
            }).save()
          );
        }),
        last(),
        map(() => undefined)
      );
    })
  );
};
