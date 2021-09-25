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

import {
  EntityType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolders$,
  findGoogleDriveFolderByName$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { ConfigProvider } from './config.provider';

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

  create$(googleDrive: drive_v3.Drive, group: string): Observable<void> {
    return from(
      findGoogleDriveFolderByName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWithoutWatermarkFolderId,
        'social-media'
      )
    ).pipe(
      concatMap((socialMediaFolder) =>
        findGoogleDriveFolderByName$(googleDrive, socialMediaFolder.id, group)
      ),
      concatMap((socialMediaGroupFolder) =>
        findGoogleDriveFolders$(googleDrive, socialMediaGroupFolder.id)
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
          this.logger.log(
            `Found social media entity ${socialMediaEntityFolder.name}`
          );
          return of(documentModelsArray[0]);
        }

        this.logger.log(
          `Creating social media entity ${socialMediaEntityFolder.name}`
        );
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.SocialMedia,
              {
                watermarkedType: WatermarkedType.Watermarked,
                group,
                slug: socialMediaEntityFolder.name,
                isPublic: false,
              },
              socialMediaEntityFolder.id
            ),
          }).save()
        );
      }),
      last(),
      map(() => undefined)
    );
  }

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    googleDriveFolderId: string
  ): Observable<GoogleDriveFolder> {
    return findGoogleDriveFolderByName$(
      googleDrive,
      googleDriveFolderId,
      'images'
    );
  }
}
