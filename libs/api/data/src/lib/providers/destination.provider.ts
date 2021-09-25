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
import {
  DestinationDto,
  DestinationMinimalDto,
} from '@dark-rush-photography/api/types';
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
      findGoogleDriveFolderByName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'destinations'
      )
    ).pipe(
      concatMap((destinationsFolder) =>
        findGoogleDriveFolders$(googleDrive, destinationsFolder.id)
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
          this.logger.log(
            `Found destination entity ${destinationEntityFolder.name}`
          );
          return of(documentModelsArray[0]);
        }

        this.logger.log(
          `Creating destination entity ${destinationEntityFolder.name}`
        );
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.Destination,
              {
                watermarkedType: WatermarkedType.Watermarked,
                group: DEFAULT_ENTITY_GROUP,
                slug: destinationEntityFolder.name,
                isPublic: false,
              },
              destinationEntityFolder.id
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
