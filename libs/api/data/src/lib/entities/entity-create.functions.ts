import { Logger } from '@nestjs/common';

import { combineLatest, concatMap, from, Observable, of } from 'rxjs';
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
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';

export const createEntity$ = (
  googleDrive: drive_v3.Drive,
  parentFolderId: string,
  entityModel: Model<DocumentModel>,
  entityType: EntityType,
  watermarkedType: WatermarkedType,
  group: string,
  slug?: string
): Observable<DocumentModel | undefined> => {
  const logger = new Logger(createEntity$.name);
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
                watermarkedType: watermarkedType,
                group,
                slug: slug ?? entityFolder.name,
              })
            ),
          ])
        ),
        concatMap(([entityFolder, documentModels]) => {
          const entitySlug = slug ?? entityFolder.name;
          const documentModelsArray = loadDocumentModelsArray(documentModels);
          if (documentModelsArray.length > 0) {
            logger.log(
              `Found ${entityType} entity ${
                group !== DEFAULT_ENTITY_GROUP ? group : ''
              } ${entitySlug}`
            );
            return of(documentModelsArray[0]);
          }

          logger.log(
            `Creating ${entityType} entity ${
              group !== DEFAULT_ENTITY_GROUP ? group : ''
            } ${entitySlug}`
          );
          return from(
            new entityModel({
              ...loadNewEntity(
                entityType,
                watermarkedType,
                group,
                entitySlug,
                entityFolder.id
              ),
            }).save()
          );
        })
      );
    })
  );
};
