import { Logger } from '@nestjs/common';

import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as tinify from 'tinify';

import {
  Env,
  ImageProcess,
  ImageProcessType,
} from '@dark-rush-photography/serverless/types';
import { formatMessage } from '../log/log.functions';
import { getBlobPath } from '@dark-rush-photography/serverless/data';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadBufferToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

export const tinifyImage$ = (
  imageProcess: ImageProcess,
  env: Env
): Observable<void> => {
  const { type, publishedImage } = imageProcess;

  Logger.log(formatMessage('TinifyImage starting'));
  Logger.log(formatMessage('TinifyImage downloading image blob'));

  return downloadAzureStorageBlobToFile$(
    env.azureStorageConnectionString,
    'private',
    getBlobPath(type as ImageProcessType, publishedImage),
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
        'private',
        getBlobPath('tinified-image', publishedImage)
      )
    ),
    map(() => Logger.log(formatMessage('TinifyImage complete')))
  );
};
