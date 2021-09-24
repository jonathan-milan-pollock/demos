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
  GoogleDriveFolder,
  ImageDimensionType,
  Group,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  PhotoOfTheWeekDto,
  PhotoOfTheWeekMinimalDto,
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

import { loadPublicContent } from '../content/public-content.functions';
import {
  validateFindImageDimension,
  validateFindStarredImage,
} from '../content/image-validation.functions';
import { loadMinimalPublicImage } from '../content/image.functions';
import { findEntityComments } from '../content/comment.functions';
import { findEntityEmotions } from '../content/emotion.functions';
import { ConfigProvider } from './config.provider';
import {
  validateEntityDatePublished,
  validateEntityLocationProvided,
  validateEntitySeoDescriptionProvided,
  validateEntitySeoKeywordsProvided,
  validateEntityTitleProvided,
} from '../entities/entity-validation.functions';

@Injectable()
export class PhotoOfTheWeekProvider {
  readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
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
      title: validateEntityTitleProvided(documentModel),
      datePublished: validateEntityDatePublished(documentModel),
      photoAlbumImageIsCentered: documentModel.photoAlbumImageIsCentered,
      starredImage: validateFindStarredImage(publicContent.images),
      starredTileImageDimensions: validateFindImageDimension(
        starredImage.id,
        ImageDimensionType.Tile,
        publicContent.imageDimensions
      ),
    };
  }

  validatePublishPhotoOfTheWeek(documentModel: DocumentModel): void {
    validateEntityTitleProvided(documentModel);
    validateEntitySeoDescriptionProvided(documentModel);
    validateEntitySeoKeywordsProvided(documentModel);
    validateEntityLocationProvided(documentModel);
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
      title: validateEntityTitleProvided(documentModel),
      description: validateEntitySeoDescriptionProvided(documentModel),
      keywords: validateEntitySeoKeywordsProvided(documentModel),
      datePublished: validateEntityDatePublished(documentModel),
      location: validateEntityLocationProvided(documentModel),
      text: documentModel.text,
      images: publicContent.images.map(loadMinimalPublicImage),
      comments: entityComments,
      emotions: entityEmotions,
    };
  }

  loadGroups$(googleDrive: drive_v3.Drive): Observable<Group[]> {
    return from(
      getGoogleDriveFolderWithName$(
        googleDrive,
        this.configProvider.googleDriveWebsitesWatermarkedFolderId,
        'photo-of-the-week'
      )
    ).pipe(
      concatMap((photoOfTheWeekFolder) =>
        getGoogleDriveFolders$(googleDrive, photoOfTheWeekFolder.id)
      ),
      concatMap((photoOfTheWeekGroupFolders) =>
        from(photoOfTheWeekGroupFolders)
      ),
      pluck('name'),
      map((name) => ({
        watermarkedType: WatermarkedType.Watermarked,
        name,
      })),
      toArray<Group>()
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
        'photo-of-the-week'
      )
    ).pipe(
      concatMap((photoOfTheWeekFolder) =>
        getGoogleDriveFolderWithName$(
          googleDrive,
          photoOfTheWeekFolder.id,
          group
        )
      ),
      concatMap((photoOfTheWeekGroupFolder) =>
        getGoogleDriveFolders$(googleDrive, photoOfTheWeekGroupFolder.id)
      ),
      concatMap((photoOFTheWeekEntityFolders) =>
        from(photoOFTheWeekEntityFolders)
      ),
      concatMap((photoOfTheWeekEntityFolder) =>
        combineLatest([
          of(photoOfTheWeekEntityFolder),
          from(
            this.entityModel.find({
              type: EntityType.PhotoOfTheWeek,
              group: group,
              slug: photoOfTheWeekEntityFolder.name,
            })
          ),
        ])
      ),
      concatMap(([photoOfTheWeekEntityFolder, documentModels]) => {
        const documentModelsArray = loadDocumentModelsArray(documentModels);
        if (documentModelsArray.length > 0) {
          this.logger.log(
            `Found photo of the week entity ${photoOfTheWeekEntityFolder.name}`
          );
          return of(documentModelsArray[0]);
        }

        this.logger.log(`Creating entity ${photoOfTheWeekEntityFolder.name}`);
        return from(
          new this.entityModel({
            ...loadNewEntity(
              EntityType.PhotoOfTheWeek,
              {
                watermarkedType: WatermarkedType.Watermarked,
                group,
                slug: photoOfTheWeekEntityFolder.name,
                isPublic: false,
              },
              photoOfTheWeekEntityFolder.id
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
    googleDriveFolderId: string,
    slug: string
  ): Observable<GoogleDriveFolder> {
    return getGoogleDriveFolderWithName$(
      googleDrive,
      googleDriveFolderId,
      slug
    );
  }
}
