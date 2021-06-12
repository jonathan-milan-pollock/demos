// eslint-disable-next-line @typescript-eslint/no-empty-function
import * as fs from 'fs-extra';

import { HttpService, Injectable, Logger } from '@nestjs/common';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { BestOf } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import {
  Env,
  ImageActivity,
  IMAGE_DIMENSIONS,
} from '@dark-rush-photography/serverless/types';

import {
  getBlobPath,
  getBlobPathWithImageDimension,
} from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

@Injectable()
export class WebsitePostImageActivityProvider {
  process$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    /**
     * if (config?.resizeImageDimensionType === undefined) {
      throw new Error(
        'resize image dimension type must be set for resizing image'
      );
    }
     */

    const { state, publishedImage, config } = imageActivity;

    const imageDimension = IMAGE_DIMENSIONS.find(
      (imageDimension) =>
        imageDimension.type === config?.resizeImageDimensionType
    );
    if (!imageDimension) throw new Error('Could not find image dimension');

    Logger.log('ResizeImage downloading image blob');

    return of();
  }
}
