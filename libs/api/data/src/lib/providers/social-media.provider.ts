import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  from,
  last,
  map,
  Observable,
  of,
  pluck,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  getGoogleDriveFolders$,
  getGoogleDriveFolderWithName$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { ConfigProvider } from './config.provider';
import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import { validateEntityFound } from '../entities/entity-validation.functions';

@Injectable()
export class SocialMediaProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(SocialMediaProvider.name);
  }

  loadGroups$(googleDrive: drive_v3.Drive): Observable<string[]> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWithoutWatermarkFolderId,
        'social-media'
      )
    ).pipe(
      concatMap((socialMediaFolder) =>
        getGoogleDriveFolders$(googleDrive, socialMediaFolder.id)
      ),
      concatMap((socialMediaGroupFolders) => from(socialMediaGroupFolders)),
      pluck('name'),
      toArray<string>()
    );
  }

  createForGroup$(
    googleDrive: drive_v3.Drive,
    group: string
  ): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWithoutWatermarkFolderId,
        'social-media'
      )
    ).pipe(
      concatMap((socialMediaFolder) =>
        getGoogleDriveFolderWithName$(googleDrive, socialMediaFolder.id, group)
      ),
      concatMap((socialMediaGroupFolder) =>
        getGoogleDriveFolders$(googleDrive, socialMediaGroupFolder.id)
      ),
      concatMap((socialMediaEntityFolders) => from(socialMediaEntityFolders)),
      concatMap((socialMediaEntityFolder) =>
        combineLatest([
          of(socialMediaEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.SocialMedia,
              group: group,
              slug: socialMediaEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([socialMediaEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(`Found entity ${socialMediaEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating entity ${socialMediaEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(EntityType.SocialMedia, {
              group,
              slug: socialMediaEntityFolder.name,
              isPosted: false,
            }),
          }).save()
        );
      }),
      last(),
      map(() => undefined)
    );
  }

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    entityId: string
  ): Observable<{
    documentModel: DocumentModel;
    imagesFolder: GoogleDriveFolder;
  }> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            this.configProvider.googleDriveWebsitesWithoutWatermarkFolderId,
            'social-media'
          ),
        ])
      ),
      concatMap(([documentModel, socialMediaFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            socialMediaFolder.id,
            documentModel.group
          ),
        ])
      ),
      concatMap(([documentModel, socialMediaGroupFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            socialMediaGroupFolder.id,
            documentModel.slug
          ),
        ])
      ),
      concatMap(([documentModel, socialMediaEntityFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            socialMediaEntityFolder.id,
            'images'
          ),
        ])
      ),
      map(([documentModel, entityImagesFolder]) => {
        return {
          documentModel: documentModel,
          imagesFolder: entityImagesFolder,
        };
      })
    );
  }
}
