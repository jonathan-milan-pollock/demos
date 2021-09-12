import { BadRequestException, Injectable } from '@nestjs/common';

import { concatMap, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { EntityType } from '@dark-rush-photography/shared/types';
import { ImagesProcessProvider } from './images-process.provider';
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

@Injectable()
export class EntityLoadProvider {
  constructor(
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
    private readonly imagesProcessProvider: ImagesProcessProvider
  ) {}

  load(googleDrive: drive_v3.Drive, entityType: EntityType): Observable<void> {
    switch (entityType) {
      case EntityType.About:
        return this.aboutProvider.create$(googleDrive);
      case EntityType.BestOf:
        return this.bestOfProvider.create$(googleDrive);
      case EntityType.Destination:
        return this.destinationProvider.create$(googleDrive);
      case EntityType.Favorites:
        return this.favoritesProvider.create$();
      case EntityType.ReviewMedia:
        return this.reviewMediaProvider.create$(googleDrive);
      case EntityType.Review:
        return this.reviewProvider.create$(googleDrive);
      default:
        return of(undefined);
    }
  }

  loadGroups$(
    googleDrive: drive_v3.Drive,
    entityType: EntityType
  ): Observable<string[]> {
    switch (entityType) {
      case EntityType.Event:
        return this.eventProvider.loadGroups$(googleDrive);
      case EntityType.PhotoOfTheWeek:
        return this.photoOfTheWeekProvider.loadGroups$(googleDrive);
      case EntityType.SharedPhotoAlbum:
        return this.sharedPhotoAlbumProvider.loadGroups$(googleDrive);
      case EntityType.SocialMedia:
        return this.socialMediaProvider.loadGroups$(googleDrive);
      default:
        throw new BadRequestException(
          `Invalid entity type ${entityType} to load groups`
        );
    }
  }

  loadForGroup$(
    googleDrive: drive_v3.Drive,
    entityType: EntityType,
    group: string
  ): Observable<void> {
    switch (entityType) {
      case EntityType.Event:
        return this.eventProvider.createForGroup$(googleDrive, group);
      case EntityType.PhotoOfTheWeek:
        return this.photoOfTheWeekProvider.createForGroup$(googleDrive, group);
      case EntityType.SharedPhotoAlbum:
        return this.sharedPhotoAlbumProvider.createForGroup$(
          googleDrive,
          group
        );
      case EntityType.SocialMedia:
        return this.socialMediaProvider.createForGroup$(googleDrive, group);
      default:
        throw new BadRequestException(
          `Invalid entity type ${entityType} to create with group ${group}`
        );
    }
  }

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
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
                googleDrive,
                newImagesFolder.documentModel,
                newImagesFolder.imagesFolder
              )
            )
          );
      case EntityType.SharedPhotoAlbum:
        return this.sharedPhotoAlbumProvider
          .findNewImagesFolder$(googleDrive, entityId)
          .pipe(
            concatMap((newImagesFolder) =>
              this.imagesProcessProvider.processNewImages$(
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
              this.imagesProcessProvider.processNewImages$(
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
