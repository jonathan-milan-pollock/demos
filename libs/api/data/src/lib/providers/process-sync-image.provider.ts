import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { concatMap, concatMapTo, from, mapTo, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { SyncImage } from '@dark-rush-photography/shared-server/types';
import {
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
  writeGoogleDriveFileToPath,
} from '@dark-rush-photography/shared-server/util';
import { ConfigProvider } from './config.provider';
import { TinifyImageProvider } from './tinify-image.provider';
import { ResizeImageProvider } from './resize-image.provider';

@Injectable()
export class ProcessSyncImageProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly tinifyImageProvider: TinifyImageProvider,
    private readonly resizeImageProvider: ResizeImageProvider
  ) {
    this.logger = new Logger(ProcessSyncImageProvider.name);
  }

  processSyncImage$(
    drive: drive_v3.Drive,
    syncImage: SyncImage
  ): Observable<void> {
    const { googleDriveImageId, media } = syncImage;

    const smallResolution = this.configProvider.findImageResolution(
      ImageDimensionType.Small
    );

    return from(writeGoogleDriveFileToPath(drive, googleDriveImageId)).pipe(
      concatMap((filePath) =>
        uploadStreamToBlob$(
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic,
          fs.createReadStream(filePath),
          getAzureStorageBlobPath(media)
        )
      ),
      concatMapTo(this.tinifyImageProvider.tinifyImage$(media)),
      concatMapTo(
        this.resizeImageProvider.resizeImage$(media, smallResolution)
      ),
      mapTo(undefined)
    );
  }
}
