import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  EntityType,
  FAVORITES_SLUG,
  GoogleDriveFolder,
  ImageState,
  REVIEW_MEDIA_SLUG,
} from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolderByName$,
  getGoogleDriveImageFiles$,
  getOrderFromGoogleDriveImageFileName,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { EntityPushNotificationsTable } from '../tables/entity-push-notifications.table';
import { loadMedia } from '../content/media.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ImageProvider } from './image.provider';
import { ImageProcessNewProvider } from './image-process-new.provider';
import { ImageRemoveProvider } from './image-remove.provider';

@Injectable()
export class ImageLoadNewProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,

    @InjectRepository(EntityPushNotificationsTable)
    private readonly entityPushNotificationsRepository: Repository<EntityPushNotificationsTable>,
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
  ): Observable<GoogleDriveFolder | undefined> {
    switch (entityType) {
      case EntityType.About:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          'images'
        );
      case EntityType.BestOf:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          'best-37'
        );
      case EntityType.Destination:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          'images'
        );
      case EntityType.Event:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          'images'
        );
      case EntityType.Favorites:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          FAVORITES_SLUG
        );
      case EntityType.ImageVideo:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          slug
        );
      case EntityType.PhotoOfTheWeek:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          slug
        );
      case EntityType.ReviewMedia:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          REVIEW_MEDIA_SLUG
        );
      case EntityType.Review:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          slug
        );
      case EntityType.SocialMedia:
        return findGoogleDriveFolderByName$(
          googleDrive,
          googleDriveFolderId,
          'images'
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
      .removeImages$(ImageState.New, entityId)
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
                      ImageState.New,
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
