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
import { AboutDto } from '@dark-rush-photography/api/types';
import {
  findGoogleDriveFolders$,
  findGoogleDriveFolderByName$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class AboutProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(AboutProvider.name);
  }

  loadAboutPublic(documentModel: DocumentModel): AboutDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      slug: documentModel.slug,
      order: documentModel.order,
      images: publicContent.images.map(loadMinimalPublicImage),
    };
  }

  create$(googleDrive: drive_v3.Drive): Observable<void> {
    return from(
      findGoogleDriveFolderByName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWithoutWatermarkFolderId,
        'about'
      )
    ).pipe(
      concatMap((aboutFolder) =>
        findGoogleDriveFolders$(googleDrive, aboutFolder.id)
      ),
      concatMap((aboutEntityFolders) => from(aboutEntityFolders)),
      concatMap((aboutEntityFolder) =>
        combineLatest([
          of(aboutEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.About,
              slug: aboutEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([aboutEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(`Found About entity ${aboutEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating About entity ${aboutEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.About,
              {
                watermarkedType: WatermarkedType.WithoutWatermark,
                group: DEFAULT_ENTITY_GROUP,
                slug: aboutEntityFolder.name,
                isPublic: true,
              },
              aboutEntityFolder.id
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
