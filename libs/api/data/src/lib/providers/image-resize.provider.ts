import { Injectable } from '@nestjs/common';

import { Observable, concatMap, map } from 'rxjs';

import {
  ImageDimension,
  IMAGE_FILE_EXTENSION,
} from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  getAzureStorageBlobPath,
  getImageFileName,
  resizeImage$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ImageAddBlobProvider } from './image-add-blob.provider';

@Injectable()
export class ImageResizeProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly imageAddBlobProvider: ImageAddBlobProvider
  ) {}

  resizeImage$(
    storageId: string,
    pathname: string,
    imageDimension: ImageDimension
  ): Observable<string> {
    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(storageId, pathname, IMAGE_FILE_EXTENSION),
      getImageFileName(pathname),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) =>
        resizeImage$(pathname, filePath, imageDimension).pipe(
          concatMap((filePath) =>
            this.imageAddBlobProvider
              .addImageDimensionBlob$(
                storageId,
                pathname,
                IMAGE_FILE_EXTENSION,
                imageDimension.type,
                filePath
              )
              .pipe(map(() => filePath))
          )
        )
      )
    );
  }
}
