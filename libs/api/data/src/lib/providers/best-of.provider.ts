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
} from '@dark-rush-photography/shared/types';
import { BestOfDto } from '@dark-rush-photography/api/types';
import {
  getGoogleDriveFolders$,
  getGoogleDriveFolderWithName$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class BestOfProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(BestOfProvider.name);
  }

  loadBestOfPublic(documentModel: DocumentModel): BestOfDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      slug: documentModel.slug,
      images: publicContent.images.map(loadMinimalPublicImage),
    };
  }

  create$(googleDrive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'best-of'
      )
    ).pipe(
      concatMap((bestOfFolder) =>
        getGoogleDriveFolders$(googleDrive, bestOfFolder.id)
      ),
      concatMap((bestOfEntityFolders) => from(bestOfEntityFolders)),
      concatMap((bestOfEntityFolder) =>
        combineLatest([
          of(bestOfEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.BestOf,
              slug: bestOfEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([bestOfEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(`Found entity ${bestOfEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating entity ${bestOfEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.BestOf,
              {
                group: DEFAULT_ENTITY_GROUP,
                slug: bestOfEntityFolder.name,
                isPublic: false,
              },
              bestOfEntityFolder.id
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
            this.configProvider.googleDriveWebsitesWatermarkedFolderId,
            'best-of'
          ),
        ])
      ),
      concatMap(([documentModel, bestOfFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            bestOfFolder.id,
            documentModel.slug
          ),
        ])
      ),
      concatMap(([documentModel, bestOfEntityFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            bestOfEntityFolder.id,
            'best-37'
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
