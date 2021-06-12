import { HttpService, Injectable, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as tinify from 'tinify';

import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import { getBlobPath } from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadBufferToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

@Injectable()
export class TinifyImageActivityProvider {
  tinifyImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const logContext = 'TinifyImageActivityProvider';
    const { state, publishedImage } = imageActivity;

    const blobPath = getBlobPath(state, publishedImage);
    Logger.log(`Downloading image blob ${blobPath}`, logContext);
    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      blobPath,
      publishedImage.imageName
    ).pipe(
      tap(() => Logger.log('Tinifying image', logContext)),
      switchMap((imageFilePath) => {
        Logger.log('Tinifying image', logContext);
        tinify.default.key = env.tinyPngApiKey;
        return from(tinify.fromFile(imageFilePath).toBuffer());
      }),
      tap(() =>
        Logger.log(
          `Uploading tinified image to blob path ${getBlobPath(
            ImageDimensionState.Tinified,
            publishedImage
          )}`,
          logContext
        )
      ),
      switchMap((uint8Array) =>
        uploadBufferToAzureStorageBlob$(
          Buffer.from(uint8Array),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPath(ImageDimensionState.Tinified, publishedImage)
        )
      ),
      map(() => Logger.log('TinifyImage complete', logContext))
    );
  }
}
