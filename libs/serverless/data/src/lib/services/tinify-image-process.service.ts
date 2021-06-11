import { Injectable, Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as tinify from 'tinify';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';

import { ImageProcessState } from '@dark-rush-photography/shared-types';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadBufferToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';
import {
  formatMessage,
  getBlobPath,
} from '@dark-rush-photography/serverless/util';

@Injectable()
export class TinifyImageProcessService {
  process$(env: Env, imageProcess: ImageProcess): Observable<void> {
    const { state, publishedImage } = imageProcess;

    Logger.log(formatMessage('TinifyImage starting'));
    Logger.log(formatMessage('TinifyImage downloading image blob'));

    //TODO: Need to save the exif data
    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() => Logger.log(formatMessage('TinifyImage executing'))),
      switchMap((imageFilePath) => {
        tinify.default.key = env.tinyPngApiKey;
        return from(tinify.fromFile(imageFilePath).toBuffer());
      }),
      tap(() =>
        Logger.log(formatMessage('TinifyImage uploading tinified image'))
      ),
      switchMap((uint8Array) =>
        uploadBufferToAzureStorageBlob$(
          Buffer.from(uint8Array),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPath(ImageProcessState.Tinified, publishedImage)
        )
      ),
      map(() => Logger.log(formatMessage('TinifyImage complete')))
    );
  }
}
