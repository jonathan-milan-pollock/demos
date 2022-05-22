/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import util = require('util');
const exec = util.promisify(require('child_process').exec);
import { Injectable } from '@nestjs/common';

import { concatMap, from, Observable } from 'rxjs';

import {
  ImageFilePathEmotion,
  ImageVideo,
  IMAGE_VIDEO_FILE_EXTENSION,
  IMAGE_VIDEO_MIME_TYPE,
  MELT_COMMAND_DEV,
  MELT_COMMAND_PROD,
} from '@dark-rush-photography/shared/types';
import {
  createTempFile$,
  getAzureStorageBlobPath,
  getImageVideoFileName,
  getMeltImageVideoArguments,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageVideoMeltProcessProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  meltProcess$(
    imageVideo: ImageVideo,
    imageFilePathEmotions: ImageFilePathEmotion[],
    imageVideoLogoFrameFilePath: string
  ): Observable<void> {
    const meltCommand = this.configProvider.production
      ? MELT_COMMAND_PROD
      : MELT_COMMAND_DEV;

    return createTempFile$(getImageVideoFileName(imageVideo.slug)).pipe(
      concatMap((imageVideoFilePath) =>
        from(
          exec(
            `${meltCommand} ${getMeltImageVideoArguments(
              imageVideoFilePath,
              imageFilePathEmotions,
              imageVideoLogoFrameFilePath
            )}`
          )
        ).pipe(
          concatMap(() =>
            uploadAzureStorageStreamToBlob$(
              fs.createReadStream(imageVideoFilePath),
              IMAGE_VIDEO_MIME_TYPE,
              getAzureStorageBlobPath(
                imageVideo.storageId,
                imageVideo.slug,
                IMAGE_VIDEO_FILE_EXTENSION
              ),
              this.configProvider.azureStorageConnectionStringPublic,
              this.configProvider.azureStorageBlobContainerNamePublic
            )
          )
        )
      )
    );
  }
}
