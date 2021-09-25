import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  GoogleDriveFolder,
  MediaState,
} from '@dark-rush-photography/shared/types';
import {
  getGoogleDriveImageFiles$,
  getOrderFromGoogleDriveImageFileName,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { EntityPushNotificationsTable } from '../tables/entity-push-notifications.table';
import { loadMedia } from '../content/media.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { AboutProvider } from './about.provider';
import { BestOfProvider } from './best-of.provider';
import { DestinationProvider } from './destination.provider';
import { EventProvider } from './event.provider';
import { FavoritesProvider } from './favorites.provider';
import { PhotoOfTheWeekProvider } from './photo-of-the-week.provider';
import { ReviewMediaProvider } from './review-media.provider';
import { ReviewProvider } from './review.provider';
import { SocialMediaProvider } from './social-media.provider';
import { ImageRemoveProvider } from './image-remove.provider';
import { ImageProcessNewProvider } from './image-process-new.provider';
import { ImageProvider } from './image.provider';

@Injectable()
export class ImageLoadNewProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,

    @InjectRepository(EntityPushNotificationsTable)
    private readonly entityPushNotificationsRepository: Repository<EntityPushNotificationsTable>,
    private readonly aboutProvider: AboutProvider,
    private readonly bestOfProvider: BestOfProvider,
    private readonly destinationProvider: DestinationProvider,
    private readonly eventProvider: EventProvider,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly reviewProvider: ReviewProvider,
    private readonly socialMediaProvider: SocialMediaProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider,
    private readonly imageProcessNewProvider: ImageProcessNewProvider
  ) {
    this.logger = new Logger(ImageLoadNewProvider.name);
  }

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    entityType: EntityType,
    googleDriveFolderId: string,
    slug: string
  ): Observable<GoogleDriveFolder> {
    switch (entityType) {
      case EntityType.About:
        return this.aboutProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId
        );
      case EntityType.BestOf:
        return this.bestOfProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId
        );
      case EntityType.Destination:
        return this.destinationProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId
        );
      case EntityType.Event:
        return this.eventProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId
        );
      case EntityType.Favorites:
        return this.favoritesProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId
        );
      case EntityType.PhotoOfTheWeek:
        return this.photoOfTheWeekProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId,
          slug
        );
      case EntityType.ReviewMedia:
        return this.reviewMediaProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId
        );
      case EntityType.Review:
        return this.reviewProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId,
          slug
        );
      case EntityType.SocialMedia:
        return this.socialMediaProvider.findNewImagesFolder$(
          googleDrive,
          googleDriveFolderId
        );
      default:
        throw new BadRequestException(
          `Invalid entity type ${entityType} to load entity`
        );
    }
  }

  loadNewImages$(
    googleDrive: drive_v3.Drive,
    entityId: string,
    entityImagesFolder: GoogleDriveFolder
  ): Observable<void> {
    return this.imageRemoveProvider
      .removeImages$(MediaState.New, entityId)
      .pipe(
        concatMap(() =>
          getGoogleDriveImageFiles$(googleDrive, entityImagesFolder.id)
        ),
        concatMap((imageFiles) => {
          if (imageFiles.length === 0) return of(undefined);

          return from(imageFiles).pipe(
            concatMap((imageFile) =>
              from(this.entityModel.findById(entityId)).pipe(
                map(validateEntityFound),
                concatMap(() => {
                  const order = getOrderFromGoogleDriveImageFileName(
                    imageFile.name
                  );
                  return this.imageProvider
                    .add$(
                      uuidv4(),
                      entityId,
                      MediaState.New,
                      imageFile.name,
                      order,
                      false
                    )
                    .pipe(
                      concatMap((image) =>
                        this.imageProcessNewProvider.loadNewImage$(
                          googleDrive,
                          imageFile.id,
                          loadMedia(
                            image.id,
                            image.entityId,
                            image.state,
                            image.blobPathId,
                            image.fileName
                          )
                        )
                      )
                    );
                })
              )
            )
          );
        }),
        last(),
        map(() => undefined)
      );
  }

  createImageProcess$(entityId: string): Observable<void> {
    const channel = new EntityPushNotificationsTable();
    channel.key = entityId;

    return from(
      this.entityPushNotificationsRepository.create(channel, channel.key)
    ).pipe(map(() => undefined));
  }
}
