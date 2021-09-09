/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { BlobUploadCommonResponse } from '@azure/storage-blob';

import { Model } from 'mongoose';
import { concatMap, from, Observable, tap } from 'rxjs';
const tinify = require('tinify');

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
//import { findImageExifDateCreated$ } from '@dark-rush-photography/api/util';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  uploadBufferToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ImageProvider } from './image.provider';
import { ImageDimensionProvider } from './image-dimension.provider';

@Injectable()
export class ImageUploadProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageProvider: ImageProvider,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {
    this.logger = new Logger(ImageUploadProvider.name);
  }

  upload$(
    media: Media,
    file: Express.Multer.File
  ): Observable<BlobUploadCommonResponse> {
    return uploadBufferToBlob$(
      this.configProvider.getAzureStorageConnectionString(media.state),
      this.configProvider.getAzureStorageBlobContainerName(media.state),
      file.buffer,
      getAzureStorageBlobPath(media)
    );
  }

  /*
  process$(
    media: Media,
    isThreeSixty: boolean,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    const tileResolution = isThreeSixty
      ? this.configProvider.findThreeSixtyImageResolution(
          ImageDimensionType.ThreeSixtyTile
        )
      : this.configProvider.findImageResolution(ImageDimensionType.Tile);
    const smallResolution = isThreeSixty
      ? this.configProvider.findThreeSixtyImageResolution(
          ImageDimensionType.ThreeSixtySmall
        )
      : this.configProvider.findImageResolution(ImageDimensionType.Small);

    return this.updateDateCreated$(media, entityModel).pipe(
   //   concatMap(this.tinifyImage$(media)),
   //   concatMap(
   //     this.imageDimensionProvider.resize$(media, tileResolution, entityModel)
   //   ),
   //   concatMap(
   //     this.imageDimensionProvider.resize$(media, smallResolution, entityModel)
   //   ),
      concatMap(
        this.imageProvider.setIsProcessing$(
          media.id,
          media.entityId,
          false,
          entityModel
        )
      ),
      tap(() => this.logger.log(`processing ${media.fileName} complete`))
    );
  }
*/
  /*
  updateDateCreated$(
    media: Media,
    entityModel: Model<DocumentModel>
  ): Observable<string> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringBlobs,
      getAzureStorageBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => findImageExifDateCreated$(filePath, new Date())),
      concatMap((dateCreated) =>
        combineLatest([
          of(dateCreated),
          this.imageProvider.setDateCreated$(
            media.id,
            media.entityId,
            dateCreated,
            entityModel
          ),
        ])
      ),
      tap(([dateCreated]) =>
        this.logger.debug(`Date image ${media.fileName} created ${dateCreated}`)
      ),
      map(([dateCreated]) => dateCreated)
    );
  }
*/

  tinifyImage$(media: Media): Observable<BlobUploadCommonResponse> {
    return downloadBlobToFile$(
      this.configProvider.getAzureStorageConnectionString(media.state),
      this.configProvider.getAzureStorageBlobContainerName(media.state),
      getAzureStorageBlobPath(media),
      media.fileName
    ).pipe(
      concatMap((filePath) => {
        tinify.default.key = this.configProvider.tinyPngApiKey;
        return from(tinify.fromFile(filePath).toBuffer());
      }),
      tap(() => this.logger.log(`Tinified image ${media.fileName}`)),
      concatMap((uint8Array) =>
        uploadBufferToBlob$(
          this.configProvider.getAzureStorageConnectionString(media.state),
          this.configProvider.getAzureStorageBlobContainerName(media.state),
          Buffer.from(uint8Array as Uint8Array),
          getAzureStorageBlobPath(media)
        )
      )
    );
  }
}
