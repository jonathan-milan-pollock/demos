import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { combineLatest, concatMap, map, Observable, of, tap } from 'rxjs';

import { ImageDimensionConfig } from '@dark-rush-photography/shared/types';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithDimension,
  resizeImage$,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageResizeProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ImageResizeProvider.name);
  }

  resize$(
    blobPathId: string,
    fileName: string,
    imageResolution: ImageDimensionConfig
  ): Observable<string> {
    return downloadBlobToFile$(
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic,
      getAzureStorageBlobPath(blobPathId, fileName),
      fileName
    ).pipe(
      tap(() =>
        this.logger.log(`Resizing ${imageResolution.type} image ${fileName}`)
      ),
      concatMap((filePath) =>
        resizeImage$(fileName, filePath, imageResolution)
      ),
      concatMap((filePath) =>
        combineLatest([
          of(filePath),
          uploadStreamToBlob$(
            this.configProvider.azureStorageConnectionStringPublic,
            this.configProvider.azureStorageBlobContainerNamePublic,
            fs.createReadStream(filePath),
            getAzureStorageBlobPathWithDimension(
              blobPathId,
              fileName,
              imageResolution.type
            )
          ),
        ])
      ),
      map(([filePath]) => filePath)
    );
  }
}
