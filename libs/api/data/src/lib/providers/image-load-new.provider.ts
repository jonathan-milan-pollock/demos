import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  EntityType,
  GoogleDriveFolder,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolderById$,
  findGoogleDriveFolderByName$,
  getEntityTypeImageFolderName,
  getGoogleDriveImageFiles$,
  getOrderFromGoogleDriveImageFileName,
} from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { ImageProcessTable } from '../tables/image-process.table';
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

    @InjectRepository(ImageProcessTable)
    private readonly entityPushNotificationsRepository: Repository<ImageProcessTable>,
    private readonly imageProvider: ImageProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider,
    private readonly imageProcessNewProvider: ImageProcessNewProvider
  ) {
    this.logger = new Logger(ImageLoadNewProvider.name);
  }

  findNewImageFolder$(
    googleDrive: drive_v3.Drive,
    googleDriveFolderId: string,
    entityType: EntityType
  ): Observable<GoogleDriveFolder | undefined> {
    const imageFolderName = getEntityTypeImageFolderName(entityType);
    if (!imageFolderName) {
      return findGoogleDriveFolderById$(googleDrive, googleDriveFolderId);
    }
    return findGoogleDriveFolderByName$(
      googleDrive,
      googleDriveFolderId,
      imageFolderName
    );
  }

  loadNewImages$(
    googleDrive: drive_v3.Drive,
    entityId: string,
    imageFolder: GoogleDriveFolder
  ): Observable<void> {
    return this.imageRemoveProvider
      .removeImages$(ImageState.New, entityId)
      .pipe(
        concatMap(() => getGoogleDriveImageFiles$(googleDrive, imageFolder.id)),
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
                          image.id,
                          image.entityId,
                          image.blobPathId,
                          image.fileName
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
    const channel = new ImageProcessTable();
    channel.key = entityId;

    return from(
      this.entityPushNotificationsRepository.create(channel, channel.key)
    ).pipe(map(() => undefined));
  }
}
