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
    slug: string,
    imageDimension: ImageDimension
  ): Observable<string> {
    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(storageId, slug, IMAGE_FILE_EXTENSION),
      getImageFileName(slug),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((filePath) =>
        resizeImage$(slug, filePath, imageDimension).pipe(
          concatMap((filePath) =>
            this.imageAddBlobProvider
              .addImageDimensionBlob$(
                storageId,
                slug,
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
