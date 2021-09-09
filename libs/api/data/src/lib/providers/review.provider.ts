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

import { EntityType, ReviewDto } from '@dark-rush-photography/shared/types';
import {
  DEFAULT_ENTITY_GROUP,
  GoogleDriveFolder,
} from '@dark-rush-photography/api/types';
import {
  getGoogleDriveFolders$,
  getGoogleDriveFolderWithName$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import {
  validateEntityFound,
  validateEntityTitle,
} from '../entities/entity-validation.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { validateOneImage } from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ReviewProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ReviewProvider.name);
  }

  loadReviewPublic(documentModel: DocumentModel): ReviewDto {
    const publicContent = loadPublicContent(documentModel);
    const validatedImage = validateOneImage(publicContent.images);
    return {
      slug: documentModel.slug,
      order: documentModel.order,
      title: validateEntityTitle(documentModel),
      text: documentModel.text,
      image: loadMinimalPublicImage(validatedImage),
    };
  }

  create$(googleDrive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWithoutWatermarkFolderId,
        'reviews'
      )
    ).pipe(
      concatMap((reviewsFolder) =>
        getGoogleDriveFolders$(googleDrive, reviewsFolder.id)
      ),
      concatMap((reviewEntityFolders) => from(reviewEntityFolders)),
      concatMap((reviewEntityFolder) =>
        combineLatest([
          of(reviewEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.Review,
              slug: reviewEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([reviewEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(`Found entity ${reviewEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating entity ${reviewEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(EntityType.Review, {
              group: DEFAULT_ENTITY_GROUP,
              slug: reviewEntityFolder.name,
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
            'reviews'
          ),
        ])
      ),
      concatMap(([documentModel, reviewsFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            reviewsFolder.id,
            documentModel.slug
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
