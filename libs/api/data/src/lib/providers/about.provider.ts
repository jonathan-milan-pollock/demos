import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  combineLatest,
  concatMap,
  concatMapTo,
  from,
  mapTo,
  Observable,
  of,
} from 'rxjs';
import { drive_v3 } from 'googleapis';

import { AboutDto, EntityType } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import {
  getGoogleDriveFolderWithName$,
  getGoogleDriveFolders$,
} from '@dark-rush-photography/shared-server/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { loadMinimalPublicVideo } from '../content/video.functions';
import { ConfigProvider } from './config.provider';
import { GoogleDriveWebsitesProvider } from './google-drive-websites.provider';

@Injectable()
export class AboutProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly googleDriveWebsitesProvider: GoogleDriveWebsitesProvider
  ) {
    this.logger = new Logger(AboutProvider.name);
  }

  loadAboutPublic(documentModel: DocumentModel): AboutDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      slug: documentModel.slug,
      order: documentModel.order,
      images: publicContent.images.map(loadMinimalPublicImage),
      videos: publicContent.videos.map(loadMinimalPublicVideo),
    };
  }

  sync$(drive: drive_v3.Drive, slugName: string): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        drive,
        this.configProvider.googleDriveWebsitesFolderId,
        'about'
      )
    ).pipe(
      concatMap((googleDriveFolder) =>
        from(
          getGoogleDriveFolderWithName$(drive, googleDriveFolder.id, slugName)
        )
      ),
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
          //TODO: Verify that only 1
          this.logger.log(`Found entity ${aboutEntityFolder.name}`);
          return combineLatest([
            getGoogleDriveFolderWithName$(
              drive,
              aboutEntityFolder.id,
              'images'
            ),
            of(documentModelsArray[0]),
          ]);
        }

        this.logger.log(`Creating entity ${aboutEntityFolder.name}`);
        return combineLatest([
          getGoogleDriveFolderWithName$(drive, aboutEntityFolder.id, 'images'),
          from(
            new this.entityModel({
              ...loadNewEntity({
                type: EntityType.About,
                group: DEFAULT_ENTITY_GROUP,
                slug: aboutEntityFolder.name,
                isPublic: false,
              }),
            }).save()
          ),
        ]);
      }),
      concatMap(([imagesFolder, documentModel]) =>
        this.googleDriveWebsitesProvider.sync$(
          drive,
          imagesFolder,
          documentModel
        )
      ),
      mapTo(undefined)
    );
  }
}
