import { Injectable, Logger } from '@nestjs/common';

import { Observable, tap, concatMap, map } from 'rxjs';

import { ImageDimension } from '@dark-rush-photography/shared/types';
import {
  downloadAzureStorageBlobToFile$,
  getAzureStorageBlobPath,
  resizeImage$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { ContentAddBlobProvider } from './content-add-blob.provider';

@Injectable()
export class ImageResizeProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly contentAddBlobProvider: ContentAddBlobProvider
  ) {
    this.logger = new Logger(ImageResizeProvider.name);
  }

  resizeImage$(
    storageId: string,
    fileName: string,
    imageDimension: ImageDimension
  ): Observable<string> {
    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(storageId, fileName),
      fileName,
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      tap(() =>
        this.logger.log(`Resizing ${imageDimension.type} image ${fileName}`)
      ),
      concatMap((filePath) =>
        resizeImage$(fileName, filePath, imageDimension).pipe(
          concatMap((resizedImageFilePath) =>
            this.contentAddBlobProvider
              .addImageDimensionBlob$(
                storageId,
                fileName,
                imageDimension.type,
                resizedImageFilePath
              )
              .pipe(map(() => resizedImageFilePath))
          )
        )
      )
    );
  }
}
