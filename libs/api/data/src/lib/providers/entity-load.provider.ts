import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  EntityWithGroupType,
  Group,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  getGoogleDrive,
  watchGoogleDriveFolder$,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { EntityPushNotificationsTable } from '../tables/entity-push-notifications.table';
import {
  validateEntityFound,
  validateEntityWatchFolderId,
  validateEntityGroupProvided,
} from '../entities/entity-validation.functions';
import { AboutProvider } from './about.provider';
import { BestOfProvider } from './best-of.provider';
import { DestinationProvider } from './destination.provider';
import { EventProvider } from './event.provider';
import { FavoritesProvider } from './favorites.provider';
import { PhotoOfTheWeekProvider } from './photo-of-the-week.provider';
import { ReviewMediaProvider } from './review-media.provider';
import { ReviewProvider } from './review.provider';
import { SharedPhotoAlbumLoadProvider } from './shared-photo-album-load.provider';
import { SocialMediaProvider } from './social-media.provider';
import { ConfigProvider } from './config.provider';

@Injectable()
export class EntityLoadProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
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
    private readonly sharedPhotoAlbumLoadProvider: SharedPhotoAlbumLoadProvider,
    private readonly socialMediaProvider: SocialMediaProvider
  ) {}

  loadGroups$(
    googleDrive: drive_v3.Drive,
    entityWithGroupType: EntityWithGroupType
  ): Observable<Group[]> {
    switch (entityWithGroupType) {
      case EntityWithGroupType.Event:
        return this.eventProvider.loadGroups$(googleDrive);
      case EntityWithGroupType.PhotoOfTheWeek:
        return this.photoOfTheWeekProvider.loadGroups$(googleDrive);
      case EntityWithGroupType.SharedPhotoAlbum:
        return this.sharedPhotoAlbumLoadProvider.loadGroups$(googleDrive);
      case EntityWithGroupType.SocialMedia:
        return this.socialMediaProvider.loadGroups$(googleDrive);
      default:
        throw new BadRequestException(
          `Entity ${entityWithGroupType} does not have groups`
        );
    }
  }

  create$(
    googleDrive: drive_v3.Drive,
    entityType: EntityType,
    watermarkedType: WatermarkedType,
    group?: string
  ): Observable<void> {
    switch (entityType) {
      case EntityType.About:
        return this.aboutProvider.create$(googleDrive);
      case EntityType.BestOf:
        return this.bestOfProvider.create$(googleDrive);
      case EntityType.Destination:
        return this.destinationProvider.create$(googleDrive);
      case EntityType.Event:
        return this.eventProvider.createForGroup$(
          googleDrive,
          validateEntityGroupProvided(group)
        );
      case EntityType.Favorites:
        return this.favoritesProvider.create$(googleDrive);
      case EntityType.PhotoOfTheWeek:
        return this.photoOfTheWeekProvider.createForGroup$(
          googleDrive,
          validateEntityGroupProvided(group)
        );
      case EntityType.ReviewMedia:
        return this.reviewMediaProvider.create$(googleDrive);
      case EntityType.Review:
        return this.reviewProvider.create$(googleDrive);
      case EntityType.SharedPhotoAlbum:
        return this.sharedPhotoAlbumLoadProvider.createForGroup$(
          googleDrive,
          watermarkedType,
          validateEntityGroupProvided(group)
        );
      case EntityType.SocialMedia:
        return this.socialMediaProvider.createForGroup$(
          googleDrive,
          validateEntityGroupProvided(group)
        );
      default:
        return of(undefined);
    }
  }

  watchFolder$(entityId: string): Observable<boolean> {
    const googleDrive = getGoogleDrive(
      this.configProvider.googleDriveClientEmail,
      this.configProvider.googleDrivePrivateKey
    );

    const channel = new EntityPushNotificationsTable();
    const channelId = uuidv4();
    const channelToken = uuidv4();

    channel.key = channelId;
    channel.token = channelToken;

    return from(
      this.entityPushNotificationsRepository.create(channel, channel.key)
    ).pipe(
      concatMap(() => from(this.entityModel.findById(entityId))),
      map(validateEntityFound),
      concatMap((documentModel) =>
        watchGoogleDriveFolder$(
          googleDrive,
          channelId,
          channelToken,
          validateEntityWatchFolderId(documentModel),
          this.configProvider.entityPushNotificationsAddress
        )
      )
    );
  }
}
