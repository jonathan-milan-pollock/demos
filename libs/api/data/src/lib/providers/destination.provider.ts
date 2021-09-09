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
  DestinationDto,
  DestinationMinimalDto,
  EntityType,
} from '@dark-rush-photography/shared/types';
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
import { validateEntityFound } from '../entities/entity-validation.functions';
import { loadPublicContent } from '../content/public-content.functions';
import { validateFindStarredImage } from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { findEntityComments } from '../content/comment.functions';
import { findEntityEmotions } from '../content/emotion.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class DestinationProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
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
      starredImage: validateFindStarredImage(publicContent.images),
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
      images: publicContent.images.map(loadMinimalPublicImage),
      comments: entityComments,
      emotions: entityEmotions,
    };
  }

  create$(googleDrive: drive_v3.Drive): Observable<void> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'destinations'
      )
    ).pipe(
      concatMap((destinationsFolder) =>
        getGoogleDriveFolders$(googleDrive, destinationsFolder.id)
      ),
      concatMap((destinationEntityFolders) => from(destinationEntityFolders)),
      concatMap((destinationEntityFolder) =>
        combineLatest([
          of(destinationEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.Destination,
              slug: destinationEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([destinationEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(`Found entity ${destinationEntityFolder.name}`);
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating entity ${destinationEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(EntityType.Destination, {
              group: DEFAULT_ENTITY_GROUP,
              slug: destinationEntityFolder.name,
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
            'destinations'
          ),
        ])
      ),
      concatMap(([documentModel, destinationsFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            destinationsFolder.id,
            documentModel.slug
          ),
        ])
      ),
      concatMap(([documentModel, destinationEntityFolder]) =>
        combineLatest([
          of(documentModel),
          getGoogleDriveFolderWithName$(
            googleDrive,
            destinationEntityFolder.id,
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
