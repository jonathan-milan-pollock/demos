import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { concatMap, Observable, tap } from 'rxjs';

import { ImageResolution } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared-server/types';
import { resizeImage$ } from '@dark-rush-photography/serverless/util';
import {
  downloadBlobToFile$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithDimension,
  uploadStreamToBlob$,
} from '@dark-rush-photography/shared-server/util';
import { ConfigProvider } from './config.provider';
import { BlobUploadCommonResponse } from '@azure/storage-blob';

@Injectable()
export class ResizeImageProvider {
  private readonly logger: Logger;

  constructor(private readonly configProvider: ConfigProvider) {
    this.logger = new Logger(ResizeImageProvider.name);
  }

  resizeImage$(
    media: Media,
    imageResolution: ImageResolution
  ): Observable<BlobUploadCommonResponse> {
    return downloadBlobToFile$(
      this.configProvider.getConnectionStringFromMediaState(media.state),
      getAzureStorageBlobPath(media),
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
        uploadStreamToBlob$(
          this.configProvider.getConnectionStringFromMediaState(media.state),
          fs.createReadStream(filePath),
          getAzureStorageBlobPathWithDimension(media, imageResolution.type)
        )
      )
    );
  }
}
