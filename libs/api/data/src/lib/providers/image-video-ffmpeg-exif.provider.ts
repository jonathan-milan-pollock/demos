/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import util = require('util');
const exec = util.promisify(require('child_process').exec);
import { Injectable } from '@nestjs/common';

import { combineLatest, concatMap, from, Observable, of } from 'rxjs';

import {
  Entity,
  FFMPEG_COMMAND_DEV,
  FFMPEG_COMMAND_PROD,
  ImageVideo,
  IMAGE_VIDEO_FILE_EXTENSION,
  IMAGE_VIDEO_MIME_TYPE,
} from '@dark-rush-photography/shared/types';
import {
  createTempFile$,
  downloadAzureStorageBlobToFile$,
  getAzureStorageBlobPath,
  getFfmpegExifImageVideoArguments,
  getImageVideoFileName,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { loadImageVideoExif } from '../images/image-exif.functions';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageVideoFfmpegExifProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  ffmpegExifImageVideo$(
    imageVideo: ImageVideo,
    entity: Entity
  ): Observable<void> {
    const ffmpegCommand = this.configProvider.production
      ? FFMPEG_COMMAND_PROD
      : FFMPEG_COMMAND_DEV;

    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(
        imageVideo.storageId,
        imageVideo.pathname,
        IMAGE_VIDEO_FILE_EXTENSION
      ),
      getImageVideoFileName(imageVideo.pathname),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((imageVideoFilePath) =>
        combineLatest([
          of(imageVideoFilePath),
          createTempFile$(getImageVideoFileName(imageVideo.pathname)),
        ])
      ),
      concatMap(([imageVideoFilePath, outputImageVideoFilePath]) =>
        from(
          exec(
            `${ffmpegCommand} ${getFfmpegExifImageVideoArguments(
              imageVideoFilePath,
              loadImageVideoExif(entity, new Date().getFullYear()),
              outputImageVideoFilePath
            )}`
          )
        ).pipe(
          concatMap(() =>
            uploadAzureStorageStreamToBlob$(
              fs.createReadStream(outputImageVideoFilePath),
              IMAGE_VIDEO_MIME_TYPE,
              getAzureStorageBlobPath(
                imageVideo.storageId,
                imageVideo.pathname,
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
