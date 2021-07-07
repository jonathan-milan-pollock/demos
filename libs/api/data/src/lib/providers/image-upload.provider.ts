import { Inject, Injectable, Logger } from '@nestjs/common';

import { BlobUploadCommonResponse } from '@azure/storage-blob';
import * as tinify from 'tinify';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';

import { ENV, Media } from '@dark-rush-photography/shared/types';
import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { findExifDateCreated$ } from '@dark-rush-photography/api/util';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';
import { AzureStorageProvider } from './azure-storage.provider';

@Injectable()
export class ImageUploadProvider {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  upload$(
    media: Media,
    isThreeSixtyImage: boolean,
    file: Express.Multer.File,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    Logger.log('Uploading image', ImageUploadProvider.name);
    return from(
      this.azureStorageProvider.uploadBufferToBlob$(
        this.env.azureStorageConnectionString,
        AzureStorageType.Private,
        file.buffer,
        this.azureStorageProvider.getBlobPath(media)
      )
    ).pipe(
      tap(() => Logger.log('Update date created', ImageUploadProvider.name)),
      //switchMapTo(from(this.updateDateCreated$(media, entityModel))),
      tap(() => Logger.log('Tinify image', ImageUploadProvider.name)),
      switchMapTo(from(this.tinifyImage$(media))),
      tap(() => Logger.log('Exif image', ImageUploadProvider.name)),
      //switchMapTo(from(this.tinifyImage$(media))),
      tap(() => Logger.log('Resize image', ImageUploadProvider.name)),
      switchMapTo(
        from(this.imageDimensionProvider.resizeImage$(media, isThreeSixtyImage))
      ),
      switchMapTo(
        from(
          this.imageProvider.setIsProcessing$(
            media.id,
            media.entityId,
            false,
            entityModel
          )
        )
      )
    );
  }

  updateDateCreated$(
    media: Media,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        AzureStorageType.Private,
        this.azureStorageProvider.getBlobPath(media),
        media.fileName
      )
      .pipe(
        switchMap((filePath) => from(findExifDateCreated$(filePath))),
        switchMap((dateCreated) =>
          from(
            this.imageProvider.setDateCreated$(
              media.id,
              media.entityId,
              dateCreated,
              entityModel
            )
          )
        )
      );
  }

  tinifyImage$(media: Media): Observable<BlobUploadCommonResponse> {
    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        AzureStorageType.Private,
        this.azureStorageProvider.getBlobPath(media),
        media.fileName
      )
      .pipe(
        switchMap((filePath) => {
          tinify.default.key = this.env.tinyPngApiKey;
          return from(tinify.fromFile(filePath).toBuffer());
        }),
        switchMap((uint8Array) =>
          from(
            this.azureStorageProvider.uploadBufferToBlob$(
              this.env.azureStorageConnectionString,
              AzureStorageType.Private,
              Buffer.from(uint8Array),
              this.azureStorageProvider.getBlobPath(media)
            )
          )
        )
      );
  }
}
