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
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  DEFAULT_ENTITY_GROUP,
  EntityType,
  GoogleDriveFolder,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  findGoogleDriveFolders$,
  findGoogleDriveFolderByName$,
} from '@dark-rush-photography/api/util';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageVideoProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ImageVideoProvider.name);
  }

  create$(
    googleDrive: drive_v3.Drive,
    watermarkedType: WatermarkedType
  ): Observable<void> {
    return from(
      findGoogleDriveFolderByName$(
        googleDrive,
        this.configProvider.getGoogleDriveWebsitesFolderId(watermarkedType),
        'image-video'
      )
    ).pipe(
      concatMap((imageVideosFolder) =>
        findGoogleDriveFolders$(googleDrive, imageVideosFolder.id)
      ),
      concatMap((imageVideoEntityFolders) => {
        if (imageVideoEntityFolders.length === 0) return of(undefined);

        return from(imageVideoEntityFolders).pipe(
          concatMap((imageVideoEntityFolder) =>
            combineLatest([
              of(imageVideoEntityFolder),
              from(
                this.entityModel.find({
                  type: EntityType.ImageVideo,
                  slug: imageVideoEntityFolder.name,
                })
              ),
            ])
          ),
          concatMap(([imageVideoEntityFolder, documentModels]) => {
            const documentModelsArray = loadDocumentModelsArray(documentModels);
            if (documentModelsArray.length > 0) {
              this.logger.log(
                `Found review media entity ${imageVideoEntityFolder.name}`
              );
              return of(documentModelsArray[0]);
            }

            this.logger.log(
              `Creating review media entity ${imageVideoEntityFolder.name}`
            );
            return from(
              new this.entityModel({
                ...loadNewEntity(
                  EntityType.ImageVideo,
                  {
                    watermarkedType,
                    group: DEFAULT_ENTITY_GROUP,
                    slug: imageVideoEntityFolder.name,
                    isPublic: false,
                  },
                  imageVideoEntityFolder.id
                ),
              }).save()
            );
          }),
          last(),
          map(() => undefined)
        );
      })
    );
  }

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    googleDriveFolderId: string,
    slug: string
  ): Observable<GoogleDriveFolder> {
    return findGoogleDriveFolderByName$(googleDrive, googleDriveFolderId, slug);
  }
}
