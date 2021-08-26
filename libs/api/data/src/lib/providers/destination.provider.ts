import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { combineLatest, concatMap, from, mapTo, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import {
  DestinationDto,
  DestinationMinimalDto,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/api/types';
import { getGoogleDriveFolderWithName$ } from '@dark-rush-photography/shared-server/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import {
  validateEntityDescription,
  validateEntityLocation,
  validateEntityTitle,
} from '../entities/entity-validation.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { validateFindStarredImage } from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { loadMinimalPublicVideo } from '../content/video.functions';
import { findEntityComments } from '../content/comment.functions';
import { findEntityEmotions } from '../content/emotion.functions';
import { ConfigProvider } from './config.provider';
import { GoogleDriveWebsitesProvider } from './google-drive-websites.provider';

@Injectable()
export class DestinationProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly googleDriveWebsitesProvider: GoogleDriveWebsitesProvider
  ) {
    this.logger = new Logger(DestinationProvider.name);
  }

  loadMinimalDestinationPublic(
    documentModel: DocumentModel
  ): DestinationMinimalDto {
    const publicContent = loadPublicContent(documentModel);
    return {
      slug: documentModel.slug,
      order: documentModel.order,
      title: validateEntityTitle(documentModel),
      starredImage: validateFindStarredImage(publicContent.images),
      hasExtendedReality: documentModel.hasExtendedReality,
    };
  }

  loadDestinationPublic(documentModel: DocumentModel): DestinationDto {
    const publicContent = loadPublicContent(documentModel);
    const entityComments = findEntityComments(publicContent.comments);
    const entityEmotions = findEntityEmotions(
      publicContent.emotions,
      publicContent.comments
    );

    return {
      slug: documentModel.slug,
      order: documentModel.order,
      title: validateEntityTitle(documentModel),
      description: validateEntityDescription(documentModel),
      keywords: documentModel.keywords,
      location: validateEntityLocation(documentModel),
      text: documentModel.text,
      images: publicContent.images.map(loadMinimalPublicImage),
      videos: publicContent.videos.map(loadMinimalPublicVideo),
      hasExtendedReality: documentModel.hasExtendedReality,
      websiteUrl: documentModel.websiteUrl,
      socialMediaUrls: documentModel.socialMediaUrls,
      comments: entityComments,
      emotions: entityEmotions,
    };
  }

  update$(drive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        drive,
        this.configProvider.googleDriveWebsitesFolderId,
        'destinations'
      )
    ).pipe(
      concatMap((folder) =>
        from(
          this.entityModel.find({
            type: EntityType.Destination,
            slug: folder.name,
          })
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
                    type: EntityType.Destination,
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
