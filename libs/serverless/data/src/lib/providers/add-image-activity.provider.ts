import * as fs from 'fs-extra';
import { HttpService, Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import {
  Env,
  ImageActivity,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';
import { apiAddImage$ } from '../apis/api-gateway/add-image.functions';

@Injectable()
export class AddImageActivityProvider {
  readonly logContext = 'AddImageActivityProvider';

  addImage$(
    env: Env,
    httpService: HttpService,
    publishedImage: PublishedImage,
    imageFilePath: string
  ): Observable<void> {
    return readCreateDateExif$(imageFilePath).pipe(
      switchMap((createDate) =>
        apiAddImage$(env, httpService, publishedImage, createDate)
      ),
      switchMap(() =>
        uploadStreamToAzureStorageBlob$(
          fs.createReadStream(imageFilePath),
          env.azureStorageConnectionString,
          AzureStorageContainerType.Private,
          getBlobPath(ImageDimensionState.Added, publishedImage)
        )
      ),
      map(() => Logger.log('AddImage complete', this.logContext))
    );
  }

  process$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const { state, publishedImage } = imageActivity;
    const blobPath = getBlobPath(state, publishedImage);
    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      blobPath,
      publishedImage.imageName
    ).pipe(
      tap(() => Logger.log('Adding image', this.logContext)),
      switchMap((imageFilePath) =>
        this.addImage$(env, httpService, publishedImage, imageFilePath)
      )
    );
  }
}
