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
  REVIEW_MEDIA_SLUG,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { ReviewMediaDto } from '@dark-rush-photography/api/types';
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
import { ConfigProvider } from './config.provider';

@Injectable()
export class ReviewMediaProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ReviewMediaProvider.name);
  }

  loadReviewMediaPublic(documentModel: DocumentModel): ReviewMediaDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      images: publicContent.images.map(loadMinimalPublicImage),
    };
  }

  create$(googleDrive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'review-media'
      )
    ).pipe(
      concatMap((reviewMediaFolder) =>
        getGoogleDriveFolders$(googleDrive, reviewMediaFolder.id)
      ),
      concatMap((reviewMediaEntityFolders) => from(reviewMediaEntityFolders)),
      concatMap((reviewMediaEntityFolder) =>
        combineLatest([
          of(reviewMediaEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.ReviewMedia,
              slug: reviewMediaEntityFolder.name,
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
            ...loadNewEntity(
              EntityType.ReviewMedia,
              {
                watermarkedType: WatermarkedType.Watermarked,
                group: DEFAULT_ENTITY_GROUP,
                slug: REVIEW_MEDIA_SLUG,
                isPublic: true,
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
    return getGoogleDriveFolderWithName$(
      googleDrive,
      googleDriveFolderId,
      REVIEW_MEDIA_SLUG
    );
  }
}
