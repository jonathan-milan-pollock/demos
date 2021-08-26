import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { combineLatest, concatMap, from, mapTo, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { EntityType, ReviewDto } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/shared-server/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import { validateEntityTitle } from '../entities/entity-validation.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { validateOneImage } from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { ConfigProvider } from './config.provider';
import { GoogleDriveWebsitesProvider } from './google-drive-websites.provider';

@Injectable()
export class ReviewProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly googleDriveWebsitesProvider: GoogleDriveWebsitesProvider
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

  update$(drive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        drive,
        this.configProvider.googleDriveWebsitesFolderId,
        'about'
      )
    ).pipe(
      concatMap((folder) =>
        from(
          this.entityModel.find({ type: EntityType.About, slug: folder.name })
        ).pipe(
          concatMap((documentModels) => {
            const documentModelsArray = loadDocumentModelsArray(documentModels);
            if (documentModelsArray.length > 0) {
              this.logger.log(`Found entity ${folder.name}`);
              return combineLatest([of(folder), of(documentModelsArray[0])]);
            }

            this.logger.log(`Creating entity ${folder.name}`);
            return combineLatest([
              of(folder),
              from(
                new this.entityModel({
                  ...loadNewEntity({
                    type: EntityType.Review,
                    group: DEFAULT_ENTITY_GROUP,
                    slug: folder.name,
                    isPublic: false,
                  }),
                }).save()
              ),
            ]);
          }),
          concatMap(([folder, documentModel]) =>
            this.googleDriveWebsitesProvider.sync$(drive, folder, documentModel)
          )
        )
      ),
      mapTo(undefined)
    );
  }
}
