import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  from,
  mapTo,
  Observable,
  of,
  pluck,
  toArray,
} from 'rxjs';
import { drive_v3 } from 'googleapis';

import { BestOfDto, EntityType } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import {
  getGoogleDriveFolders$,
  getGoogleDriveFolderWithName$,
} from '@dark-rush-photography/shared-server/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { ConfigProvider } from './config.provider';
import { GoogleDriveWebsitesProvider } from './google-drive-websites.provider';

@Injectable()
export class BestOfProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly googleDriveWebsitesProvider: GoogleDriveWebsitesProvider
  ) {
    this.logger = new Logger(BestOfProvider.name);
  }

  loadBestOfPublic(documentModel: DocumentModel): BestOfDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      images: publicContent.images.map(loadMinimalPublicImage),
    };
  }

  findFolders$(drive: drive_v3.Drive): Observable<string[]> {
    return from(
      getGoogleDriveFolderWithName$(
        drive,
        this.configProvider.googleDriveWebsitesFolderId,
        'best-of'
      )
    ).pipe(
      concatMap((bestOfFolder) =>
        getGoogleDriveFolders$(drive, bestOfFolder.id)
      ),
      concatMap((bestOfFolders) => from(bestOfFolders)),
      pluck('name'),
      toArray<string>()
    );
  }

  sync$(drive: drive_v3.Drive, folderName: string): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        drive,
        this.configProvider.googleDriveWebsitesFolderId,
        'best-of'
      )
    ).pipe(
      concatMap((bestOfFolder) =>
        getGoogleDriveFolderWithName$(drive, bestOfFolder.id, folderName)
      ),
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
          return combineLatest([
            getGoogleDriveFolderWithName$(
              drive,
              bestOfEntityFolder.id,
              'best-37'
            ),
            of(documentModelsArray[0]),
          ]);
        }

        this.logger.log(`Creating entity ${bestOfEntityFolder.name}`);
        return combineLatest([
          getGoogleDriveFolderWithName$(
            drive,
            bestOfEntityFolder.id,
            'best-37'
          ),
          from(
            new this.entityModel({
              ...loadNewEntity({
                type: EntityType.BestOf,
                group: DEFAULT_ENTITY_GROUP,
                slug: bestOfEntityFolder.name,
                isPosted: true,
              }),
            }).save()
          ),
        ]);
      }),
      concatMap(([best37Folder, documentModel]) =>
        this.googleDriveWebsitesProvider.sync$(
          drive,
          best37Folder,
          documentModel
        )
      ),
      mapTo(undefined)
    );
  }
}
