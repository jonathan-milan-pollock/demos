import { Injectable, Inject, Logger } from '@nestjs/common';

import * as tinify from 'tinify';
import { from } from 'rxjs';
import { mapTo, switchMap, take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared/types';
import { Env, Activity } from '@dark-rush-photography/serverless/types';
import { AzureStorageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class ResizeVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  async resizeVideo(activity: Activity): Promise<Activity> {
    Logger.log('Create Image Video started', CreateImageVideoService.name);

    const blobPath = this.azureStorageProvider.getBlobPath(activity.media);
    const azureStorageType = this.azureStorageProvider.getAzureStorageType(
      activity.media.state
    );
    return this.azureStorageProvider
      .downloadBlobToFile$(
        this.env.azureStorageConnectionString,
        azureStorageType,
        blobPath,
        activity.media.fileName
      )
      .pipe(
        switchMap((imageFilePath) => {
          tinify.default.key = this.env.tinyPngApiKey;
          return from(tinify.fromFile(imageFilePath).toBuffer());
        }),
        switchMap((uint8Array) =>
          this.azureStorageProvider.uploadBufferToBlob$(
            this.env.azureStorageConnectionString,
            azureStorageType,
            Buffer.from(uint8Array),
            blobPath
          )
        ),
        mapTo(Logger.log('Tinify Image complete', TinifyImageService.name)),
        take(1)
      )
      .toPromise()
      .then(() => activity);
  }
}
