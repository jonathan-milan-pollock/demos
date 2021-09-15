import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType, MediaState } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityWatchFolderId,
  validateEntityNotPublishing,
  validateEntityType,
} from '../entities/entity-validation.functions';
import { AboutProvider } from './about.provider';
import { BestOfProvider } from './best-of.provider';
import { DestinationProvider } from './destination.provider';
import { EventProvider } from './event.provider';
import { FavoritesProvider } from './favorites.provider';
import { PhotoOfTheWeekProvider } from './photo-of-the-week.provider';
import { ReviewMediaProvider } from './review-media.provider';
import { ReviewProvider } from './review.provider';
import { SharedPhotoAlbumProvider } from './shared-photo-album.provider';
import { SocialMediaProvider } from './social-media.provider';
import { ImageUpdateProvider } from './image-update.provider';
import {
  getExifDate,
  getGoogleDrive,
  getGoogleDriveFolderParents$,
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
    private readonly sharedPhotoAlbumProvider: SharedPhotoAlbumProvider,
    private readonly socialMediaProvider: SocialMediaProvider,
    private readonly imageUpdateProvider: ImageUpdateProvider
  ) {}

  publish$(
    entityType: EntityType,
    entityId: string,
    renameMediaWithEntitySlug: boolean
  ): Observable<void> {
    /*if (entityType === EntityType.SharedPhotoAlbum) {
      const googleDrive = getGoogleDrive(
        this.configProvider.googleDriveClientEmail,
        this.configProvider.googleDrivePrivateKey
      );

      return from(this.entityModel.findById(entityId)).pipe(
        map(validateEntityFound),
        map((documentModel) => validateEntityType(entityType, documentModel)),
        concatMap((documentModel) =>
          getGoogleDriveFolderParents$(
            googleDrive,
            validateEntityGoogleDriveFolderId(documentModel.googleDriveFolderId)
          )
        ),
        map(() => undefined)
      );

      //;
      // Dark Rush
      // Lightroom Export
      // Shared
      // Watermarked or Unwatermaked
      // Shared With Folder
      // Photo Album
    }*/

    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => validateEntityType(entityType, documentModel)),
      map(validateEntityNotPublishing),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, { isPublishing: true })
        )
      ),
      map(validateEntityFound),
      map(() => undefined)
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
    );
  }
}
