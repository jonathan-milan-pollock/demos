import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  GoogleDriveFile,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { getOrderFromGoogleDriveImageFileName } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { addImage$ } from '../content/image-add.functions';
import { addNewImageBlob$ } from '../content/image-add-blob.functions';
import { ConfigProvider } from './config.provider';
import { ImageProcessProvider } from './image-process.provider';

@Injectable()
export class ImageAddNewProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProcessProvider: ImageProcessProvider
  ) {}

  addNewImage$(
    googleDrive: drive_v3.Drive,
    newImageFile: GoogleDriveFile,
    entityId: string
  ): Observable<undefined> {
    const order = getOrderFromGoogleDriveImageFileName(newImageFile.name);
    return addImage$(
      this.entityModel,
      entityId,
      ImageState.New,
      newImageFile.name,
      order,
      false
    ).pipe(
      concatMap((newImage) =>
        addNewImageBlob$(
          googleDrive,
          newImageFile,
          newImage,
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageConnectionStringPublic
        )
      ),
      concatMap((image) => this.imageProcessProvider.processNewImage$(image)),
      map(() => undefined)
    );
  }
}
