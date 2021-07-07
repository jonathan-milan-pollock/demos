import { Injectable, Inject, Logger } from '@nestjs/common';

import { from } from 'rxjs';
import { map, mapTo, take } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared-server/types';
import { Env } from '@dark-rush-photography/serverless/types';
import { AzureStorageProvider } from '@dark-rush-photography/serverless/data';

@Injectable()
export class CreateImageVideoService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly azureStorageProvider: AzureStorageProvider
  ) {}

  // TODO: The Image that is stared is the cover image, the ones that are loved will be in the video
  async createImageVideo(medium: Media[]): Promise<Media> {
    Logger.log('Create Image Video started', CreateImageVideoService.name);

    return from(medium)
      .pipe(
        map((media) => {
          const blobPath = this.azureStorageProvider.getBlobPath(media);
          const azureStorageType = this.azureStorageProvider.getAzureStorageType(
            media.state
          );
          return this.azureStorageProvider.downloadBlobToFile$(
            this.env.azureStorageConnectionString,
            azureStorageType,
            blobPath,
            media.fileName
          );
        }),
        // Create the image video
        // Upload to azure
        /*switchMap((filePath) => {
      }),
      switchMap((uint8Array) =>
        this.azureStorageProvider.uploadBufferToBlob$(
          this.env.azureStorageConnectionString,
          azureStorageType,
          Buffer.from(uint8Array),
          blobPath
        )
      )*/
        mapTo(
          Logger.log(
            'Create Image Video complete',
            CreateImageVideoService.name
          )
        ),
        take(1)
      )
      .toPromise()
      .then(() => medium[0]); // will be returning the video that was created as the medium
  }
}
