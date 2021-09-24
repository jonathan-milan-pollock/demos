import { BadRequestException, Injectable } from '@nestjs/common';

import { concatMap, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { EntityType } from '@dark-rush-photography/shared/types';
import { ImageLoadNewProvider } from './image-load-new.provider';
import { AboutProvider } from './about.provider';
import { BestOfProvider } from './best-of.provider';
import { DestinationProvider } from './destination.provider';
import { EventProvider } from './event.provider';
import { FavoritesProvider } from './favorites.provider';
import { PhotoOfTheWeekProvider } from './photo-of-the-week.provider';
import { ReviewMediaProvider } from './review-media.provider';
import { ReviewProvider } from './review.provider';
import { SharedPhotoAlbumImageProvider } from './shared-photo-album-image.provider';
import { SocialMediaProvider } from './social-media.provider';

@Injectable()
export class ImageLoadNewFolderProvider {
  constructor(
    private readonly aboutProvider: AboutProvider,
    private readonly bestOfProvider: BestOfProvider,
    private readonly destinationProvider: DestinationProvider,
    private readonly eventProvider: EventProvider,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly reviewProvider: ReviewProvider,
    private readonly sharedPhotoAlbumImageProvider: SharedPhotoAlbumImageProvider,
    private readonly socialMediaProvider: SocialMediaProvider,
    private readonly imageLoadNewProvider: ImageLoadNewProvider
  ) {}

  loadNewImages$(
    googleDrive: drive_v3.Drive,
    entityType: EntityType,
    entityId: string
  ): Observable<void> {
    switch (entityType) {
      case EntityType.About:
        return this.aboutProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.BestOf:
        return this.bestOfProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.Destination:
        return this.destinationProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.Event:
        return this.eventProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.Favorites:
        return this.favoritesProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.PhotoOfTheWeek:
        return this.photoOfTheWeekProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.ReviewMedia:
        return this.reviewMediaProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.Review:
        return this.reviewProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.SharedPhotoAlbum:
        return this.sharedPhotoAlbumImageProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.SocialMedia:
        return this.socialMediaProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imageLoadNewProvider.loadNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      default:
        throw new BadRequestException(
          `Invalid entity type ${entityType} to load entity`
        );
    }
  }
}
