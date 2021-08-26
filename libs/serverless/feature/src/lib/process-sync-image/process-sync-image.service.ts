import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';

import { concatMap, concatMapTo, from, lastValueFrom } from 'rxjs';
import { google } from 'googleapis';

import { SyncImage } from '@dark-rush-photography/shared-server/types';
import {
  getAzureStorageBlobPath,
  uploadStreamToBlob$,
  writeGoogleDriveFileToPath,
} from '@dark-rush-photography/shared-server/util';
import {
  ConfigProvider,
  ProcessSyncImageProvider,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class ProcessSyncImageService {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    private readonly processSyncImageProvider: ProcessSyncImageProvider
  ) {
    this.logger = new Logger(ProcessSyncImageService.name);
  }

  async processSyncImage(syncImage: SyncImage): Promise<SyncImage> {
    this.logger.log('Process Sync Image');

    const { media, googleDriveImageId } = syncImage;

    const scopes = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.JWT(
      this.configProvider.googleDriveClientEmail,
      undefined,
      this.configProvider.googleDrivePrivateKey.replace(/\\n/gm, '\n'),
      scopes
    );

    const drive = google.drive({ version: 'v3', auth });

    return lastValueFrom(
      from(writeGoogleDriveFileToPath(drive, googleDriveImageId)).pipe(
        concatMap((filePath) =>
          uploadStreamToBlob$(
            this.configProvider.getConnectionStringFromMediaState(media.state),
            fs.createReadStream(filePath),
            getAzureStorageBlobPath(media)
          )
        ),
        concatMapTo(this.processSyncImageProvider.processSyncImage$(media))
      )
    ).then(() => syncImage);
  }
}
