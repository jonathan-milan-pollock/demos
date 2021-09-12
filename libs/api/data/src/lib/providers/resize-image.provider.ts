import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { combineLatest, concatMap, map, Observable, of, tap } from 'rxjs';

import { ImageDimensionConfig } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared/types';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithDimension,
  resizeImage$,
  uploadStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ResizeImageProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ResizeImageProvider.name);
  }

  resize$(
    media: Media,
    imageResolution: ImageDimensionConfig
  ): Observable<string> {
    return downloadBlobToFile$(
      this.configProvider.getAzureStorageConnectionString(media.state),
      this.configProvider.getAzureStorageBlobContainerName(media.state),
      getAzureStorageBlobPath(media.blobPathId, media.fileName),
      media.fileName
    ).pipe(
      tap(() =>
        this.logger.log(
          `Resizing ${imageResolution.type} image ${media.fileName}`
        )
      ),
      concatMap((filePath) =>
        resizeImage$(media.fileName, filePath, imageResolution)
      ),
      concatMap((filePath) =>
        combineLatest([
          of(filePath),
          uploadStreamToBlob$(
            this.configProvider.getAzureStorageConnectionString(media.state),
            this.configProvider.getAzureStorageBlobContainerName(media.state),
            fs.createReadStream(filePath),
            getAzureStorageBlobPathWithDimension(
              media.blobPathId,
              media.fileName,
              imageResolution.type
            )
          ),
        ])
      ),
      map(([filePath]) => filePath)
    );
  }
}
