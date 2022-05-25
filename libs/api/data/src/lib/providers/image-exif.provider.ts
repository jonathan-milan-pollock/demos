import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { Observable, tap, concatMap, of, map } from 'rxjs';

import {
  Entity,
  Image,
  IMAGE_FILE_EXTENSION,
  IMAGE_MIME_TYPE,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  exifImage$,
  findExifCreatedDate$,
  getAzureStorageBlobPath,
  getExifDateFromIsoDate,
  getImageFileName,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { loadImageExif } from '../images/image-exif.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageExifProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ImageExifProvider.name);
  }

  findExifCreatedDate$(image: Image): Observable<string> {
    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(
        image.storageId,
        image.pathname,
        IMAGE_FILE_EXTENSION
      ),
      getImageFileName(image.pathname),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) => findExifCreatedDate$(filePath)),
      map(
        (createdDate) =>
          createdDate ?? getExifDateFromIsoDate(new Date().toISOString())
      ),
      tap((createdDate) =>
        this.logger.log(
          `Exif image ${getImageFileName(
            image.pathname
          )} created date is ${createdDate}`
        )
      )
    );
  }

  exifImage$(image: Image, entity: Entity): Observable<void> {
    if (entity.watermarkedType === WatermarkedType.WithoutWatermark)
      return of(undefined);

    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(
        image.storageId,
        image.pathname,
        IMAGE_FILE_EXTENSION
      ),
      getImageFileName(image.pathname),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) =>
        exifImage$(
          filePath,
          loadImageExif(image, entity, new Date().getFullYear())
        ).pipe(
          concatMap(() =>
            uploadAzureStorageStreamToBlob$(
              fs.createReadStream(filePath),
              IMAGE_MIME_TYPE,
              getAzureStorageBlobPath(
                image.storageId,
                image.pathname,
                IMAGE_FILE_EXTENSION
              ),
              this.configProvider.azureStorageConnectionStringPublic,
              this.configProvider.azureStorageBlobContainerNamePublic
            )
          )
        )
      )
    );
  }
}
