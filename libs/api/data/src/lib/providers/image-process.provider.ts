import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { concatMap, from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/api/types';
import {
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
  downloadGoogleDriveFile,
  findImageResolution,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';
import { TinifyImageProvider } from './tinify-image.provider';
import { ResizeImageProvider } from './resize-image.provider';

@Injectable()
export class ImageProcessProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly tinifyImageProvider: TinifyImageProvider,
    private readonly resizeImageProvider: ResizeImageProvider
  ) {
    this.logger = new Logger(ImageProcessProvider.name);
  }

  processNewImage$(
    googleDrive: drive_v3.Drive,
    imageFileId: string,
    media: Media
  ): Observable<void> {
    const smallResolution = findImageResolution(ImageDimensionType.Small);

    return from(downloadGoogleDriveFile(googleDrive, imageFileId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.getAzureStorageConnectionString(media.state),
          this.configProvider.azureStorageBlobContainerName,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media)
        )
      ),
      concatMap(() => this.tinifyImageProvider.tinifyImage$(media)),
      concatMap(() =>
        this.resizeImageProvider.resizeImage$(media, smallResolution)
      ),
      map(() => undefined)
    );
  }
}
