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

import {
  EntityType,
  EventDto,
  EventMinimalDto,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';
import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
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
  validateEntityDateCreated,
  validateEntityDescription,
  validateEntityFound,
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
      title: validateEntityTitle(documentModel),
      tileImageIsCentered: documentModel.tileImageIsCentered,
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
      title: validateEntityTitle(documentModel),
      description: validateEntityDescription(documentModel),
      keywords: documentModel.seoKeywords,
      dateCreated: validateEntityDateCreated(documentModel),
      location: validateEntityLocation(documentModel),
      text: documentModel.text,
      images: publicContent.images.map(loadMinimalPublicImage),
      comments: entityComments,
      emotions: entityEmotions,
    };
  }

  loadGroups$(googleDrive: drive_v3.Drive): Observable<string[]> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'events'
      )
    ).pipe(
      concatMap((eventsFolder) =>
        getGoogleDriveFolders$(googleDrive, eventsFolder.id)
      ),
      concatMap((eventGroupFolders) => from(eventGroupFolders)),
      pluck('name'),
      toArray<string>()
    );
  }

  createForGroup$(
    googleDrive: drive_v3.Drive,
    group: string
  ): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'events'
      )
    ).pipe(
      concatMap((eventsFolder) =>
        getGoogleDriveFolderWithName$(googleDrive, eventsFolder.id, group)
      ),
      concatMap((eventGroupFolder) =>
        getGoogleDriveFolders$(googleDrive, eventGroupFolder.id)
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
          this.logger.log(`Found entity ${eventEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating entity ${eventEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(EntityType.Event, {
              group,
              slug: eventEntityFolder.name,
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
            this.configProvider.googleDriveWebsitesWatermarkedFolderId,
            'events'
          ),
        ])
      ),
      concatMap(([documentModel, eventsFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            eventsFolder.id,
            documentModel.group
          ),
        ])
      ),
      concatMap(([documentModel, eventGroupFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            eventGroupFolder.id,
            documentModel.slug
          ),
        ])
      ),
      concatMap(([documentModel, eventEntityFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            eventEntityFolder.id,
            'images'
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
