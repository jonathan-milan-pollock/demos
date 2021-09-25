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
  pluck,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import { EventDto, EventMinimalDto } from '@dark-rush-photography/api/types';
import {
  EntityType,
  GoogleDriveFolder,
  ImageDimensionType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolders$,
  findGoogleDriveFolderByName$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  loadDocumentModelsArray,
  loadNewEntity,
} from '../entities/entity.functions';
import {
  validateEntityDateCreatedProvided,
  validateEntitySeoDescriptionProvided,
  validateEntityLocationProvided,
  validateEntityTitleProvided,
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

@Injectable()
export class EventProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(EventProvider.name);
  }

  loadMinimalEventPublic(documentModel: DocumentModel): EventMinimalDto {
    const publicContent = loadPublicContent(documentModel);
    const starredImage = validateFindStarredImage(publicContent.images);
    return {
      group: documentModel.group,
      slug: documentModel.slug,
      order: documentModel.order,
      title: validateEntityTitleProvided(documentModel),
      photoAlbumImageIsCentered: documentModel.photoAlbumImageIsCentered,
      starredImage,
      starredTileImageDimensions: validateFindImageDimension(
        starredImage.id,
        ImageDimensionType.Tile,
        publicContent.imageDimensions
      ),
    };
  }

  loadEventPublic(documentModel: DocumentModel): EventDto {
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
      title: validateEntityTitleProvided(documentModel),
      description: validateEntitySeoDescriptionProvided(documentModel),
      keywords: documentModel.seoKeywords,
      dateCreated: validateEntityDateCreatedProvided(documentModel),
      location: validateEntityLocationProvided(documentModel),
      text: documentModel.text,
      images: publicContent.images.map(loadMinimalPublicImage),
      comments: entityComments,
      emotions: entityEmotions,
    };
  }

  create$(googleDrive: drive_v3.Drive, group: string): Observable<void> {
    return from(
      findGoogleDriveFolderByName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'events'
      )
    ).pipe(
      concatMap((eventsFolder) =>
        findGoogleDriveFolderByName$(googleDrive, eventsFolder.id, group)
      ),
      concatMap((eventGroupFolder) =>
        findGoogleDriveFolders$(googleDrive, eventGroupFolder.id)
      ),
      concatMap((eventEntityFolders) => from(eventEntityFolders)),
      concatMap((eventEntityFolder) =>
        combineLatest([
          of(eventEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.Event,
              group,
              slug: eventEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([eventEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(`Found event entity ${eventEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating event entity ${eventEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.Event,
              {
                watermarkedType: WatermarkedType.Watermarked,
                group,
                slug: eventEntityFolder.name,
                isPublic: false,
              },
              eventEntityFolder.id
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
