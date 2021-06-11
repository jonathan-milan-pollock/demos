// eslint-disable-next-line @typescript-eslint/no-empty-function
import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BestOf } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import {
  Env,
  ImageProcess,
  IMAGE_DIMENSIONS,
} from '@dark-rush-photography/serverless/types';

import {
  formatMessage,
  getBlobPath,
  getBlobPathWithImageDimension,
} from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

@Injectable()
export class WebsitePostImageProcessService {
  process$(
    env: Env,
    httpService: HttpService,
    imageProcess: ImageProcess
  ): Observable<void> {
    /**
     * if (imageProcess.data?.resizeType === undefined) {
      throw new Error(
        'resize image dimension type must be set for resizing image'
      );
    }
     */

    const { state, publishedImage, data: imageProcessData } = imageProcess;

    const imageDimension = IMAGE_DIMENSIONS.find(
      (imageDimension) => imageDimension.type === imageProcessData?.resizeType
    );
    if (!imageDimension) throw new Error('Could not find image dimension');

    Logger.log(formatMessage('ResizeImage starting'));
    Logger.log(formatMessage('ResizeImage downloading image blob'));

    return of();
  }
}
