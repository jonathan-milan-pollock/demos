/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { combineLatest, concatMap, from, mapTo, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  ImageDimensionType,
  PhotoOfTheWeekDto,
  PhotoOfTheWeekMinimalDto,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/shared-server/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import {
  validateEntityDatePublished,
  validateEntityDescription,
  validateEntityLocation,
  validateEntityTitle,
} from '../entities/entity-validation.functions';
import { loadPublicContent } from '../content/public-content.functions';
import {
  validateFindImageDimension,
  validateFindStarredImage,
} from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { findEntityComments } from '../content/comment.functions';
import { findEntityEmotions } from '../content/emotion.functions';
import { ConfigProvider } from './config.provider';
import { GoogleDriveWebsitesProvider } from './google-drive-websites.provider';

@Injectable()
export class PhotoOfTheWeekProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly googleDriveWebsitesProvider: GoogleDriveWebsitesProvider
  ) {
    this.logger = new Logger(PhotoOfTheWeekProvider.name);
  }

  loadMinimalPhotoOfTheWeekPublic(
    documentModel: DocumentModel
  ): PhotoOfTheWeekMinimalDto {
    const publicContent = loadPublicContent(documentModel);
    const starredImage = validateFindStarredImage(publicContent.images);
    return {
      group: documentModel.group,
      slug: documentModel.slug,
      order: documentModel.order,
      title: validateEntityTitle(documentModel),
      datePublished: validateEntityDatePublished(documentModel),
      tileImageIsCentered: documentModel.tileImageIsCentered,
      starredImage: validateFindStarredImage(publicContent.images),
      starredTileImageDimensions: validateFindImageDimension(
        starredImage.id,
        ImageDimensionType.Tile,
        publicContent.imageDimensions
      ),
    };
  }

  loadPhotoOfTheWeekPublic(documentModel: DocumentModel): PhotoOfTheWeekDto {
    const publicContent = loadPublicContent(documentModel);
    const entityComments = findEntityComments(publicContent.comments);
    const entityEmotions = findEntityEmotions(
      publicContent.emotions,
      publicContent.comments
    );

    return {
      group: documentModel.group,
      slug: documentModel.slug,
      order: documentModel.order,
      title: validateEntityTitle(documentModel),
      description: validateEntityDescription(documentModel),
      keywords: documentModel.seoKeywords,
      datePublished: validateEntityDatePublished(documentModel),
      location: validateEntityLocation(documentModel),
      text: documentModel.text,
      images: publicContent.images.map(loadMinimalPublicImage),
      comments: entityComments,
      emotions: entityEmotions,
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
                    type: EntityType.About,
                    group: DEFAULT_ENTITY_GROUP,
                    slug: folder.name,
                    isPosted: false,
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
