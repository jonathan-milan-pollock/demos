import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  from,
  map,
  Observable,
  of,
  pluck,
  tap,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3, GoogleApis } from 'googleapis';

import {
  EntityType,
  GoogleDriveFolder,
  MediaState,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityWatchFolderId,
  validateEntityNotPublishing,
  validateEntityType,
  validateEntityGoogleDriveFolderId,
} from '../entities/entity-validation.functions';
import { AboutProvider } from './about.provider';
import { BestOfProvider } from './best-of.provider';
import { DestinationProvider } from './destination.provider';
import { EventProvider } from './event.provider';
import { FavoritesProvider } from './favorites.provider';
import { PhotoOfTheWeekProvider } from './photo-of-the-week.provider';
import { ReviewMediaProvider } from './review-media.provider';
import { ReviewProvider } from './review.provider';
import { SharedPhotoAlbumPublishProvider } from './shared-photo-album-publish.provider';
import { SocialMediaProvider } from './social-media.provider';
import { ImageUpdateProvider } from './image-update.provider';
import {
  createGoogleDriveFolder$,
  getExifDate,
  getGoogleDrive,
  getGoogleDriveFolderParents$,
  getGoogleDriveFolderWithName$,
  getGoogleDriveImageFiles$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class EntityPublishProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly aboutProvider: AboutProvider,
    private readonly bestOfProvider: BestOfProvider,
    private readonly destinationProvider: DestinationProvider,
    private readonly eventProvider: EventProvider,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly reviewProvider: ReviewProvider,
    private readonly sharedPhotoAlbumPublishProvider: SharedPhotoAlbumPublishProvider,
    private readonly socialMediaProvider: SocialMediaProvider,
    private readonly imageUpdateProvider: ImageUpdateProvider
  ) {}

  publish$(
    entityType: EntityType,
    documentModel: DocumentModel,
    renameMediaWithEntitySlug: boolean
  ): Observable<void> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    if (entityType === EntityType.SharedPhotoAlbum) {
      return this.sharedPhotoAlbumPublishProvider
        .createDarkRushPhotographySharedPhotoAlbumFolder$(
          googleDrive,
          documentModel
        )
        .pipe(
          concatMap((darkRushPhotographySharedPhotoAlbumFolder) =>
            this.sharedPhotoAlbumPublishProvider.publishSharedPhotoAlbumFolder$(
              googleDrive,
              documentModel,
              darkRushPhotographySharedPhotoAlbumFolder
            )
          )
        );
    }

    return of(documentModel).pipe(
      map(validateEntityNotPublishing),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(documentModel._id, {
            isPublishing: true,
          })
        )
      ),
      map(() => undefined)
    );
    /*

      // TODO: validate for each entity

      concatMap((documentModel) =>
        combineLatest([
          from(
            documentModel.videos.filter(
              (video) => video.state === MediaState.Selected
            )
          ),
          of(documentModel),
        ])
      ),
      concatMap(() =>
        from(this.entityModel.findByIdAndUpdate(entityId, { isPublishing: false }))
      ),
      map(() => undefined)
      //concatMap(([video, documentModel]) =>
      //  this.videoProvider.update$(
      //    video,
      //    {
      //      fileName: `${documentModel.slug}${path.extname(video.fileName)}`,
      //      state: MediaState.Posted,
      //    },
      //    documentModel,
      //    entityModel
      //  )
      //),*/
  }
}
