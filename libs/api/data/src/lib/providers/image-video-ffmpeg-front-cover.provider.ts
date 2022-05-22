/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs-extra';
import util = require('util');
const exec = util.promisify(require('child_process').exec);
import { Injectable } from '@nestjs/common';

import { combineLatest, concatMap, from, Observable, of } from 'rxjs';

import {
  FFMPEG_COMMAND_DEV,
  FFMPEG_COMMAND_PROD,
  Image,
  ImageDimensionType,
  ImageVideo,
  IMAGE_FILE_EXTENSION,
  IMAGE_VIDEO_FILE_EXTENSION,
  IMAGE_VIDEO_MIME_TYPE,
} from '@dark-rush-photography/shared/types';
import {
  createTempFile$,
  downloadAzureStorageBlobToFile$,
  getAzureStorageBlobPath,
  getAzureStorageBlobPathWithImageDimension,
  getFfmpegFrontCoverImageVideoArguments,
  getImageFileName,
  getImageVideoFileName,
  uploadAzureStorageStreamToBlob$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ImageVideoFfmpegFrontCoverProvider {
  constructor(private readonly configProvider: ConfigProvider) {}

  ffmpegFrontCoverImageVideo$(
    imageVideo: ImageVideo,
    starredImage: Image
  ): Observable<void> {
    const ffmpegCommand = this.configProvider.production
      ? FFMPEG_COMMAND_PROD
      : FFMPEG_COMMAND_DEV;

    return downloadAzureStorageBlobToFile$(
      getAzureStorageBlobPath(
        imageVideo.storageId,
        imageVideo.slug,
        IMAGE_VIDEO_FILE_EXTENSION
      ),
      getImageVideoFileName(imageVideo.slug),
      this.configProvider.azureStorageConnectionStringPublic,
      this.configProvider.azureStorageBlobContainerNamePublic
    ).pipe(
      concatMap((imageVideoFilePath) =>
        combineLatest([
          of(imageVideoFilePath),
          downloadAzureStorageBlobToFile$(
            getAzureStorageBlobPathWithImageDimension(
              starredImage.storageId,
              starredImage.slug,
              IMAGE_FILE_EXTENSION,
              ImageDimensionType.YouTube
            ),
            getImageFileName(starredImage.slug),
            this.configProvider.azureStorageConnectionStringPublic,
            this.configProvider.azureStorageBlobContainerNamePublic
          ),
          createTempFile$(getImageVideoFileName(imageVideo.slug)),
        ])
      ),
      concatMap(
        ([
          imageVideoFilePath,
          starredImageFilePath,
          outputImageVideoFilePath,
        ]) =>
          from(
            exec(
              `${ffmpegCommand} ${getFfmpegFrontCoverImageVideoArguments(
                imageVideoFilePath,
                starredImageFilePath,
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
