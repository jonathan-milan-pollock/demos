import * as fs from 'fs-extra';
import { HttpService, Injectable, Logger } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import {
  AzureStorageContainerType,
  Env,
  ImageActivity,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  readCreateDateExif$,
} from '@dark-rush-photography/serverless/util';
import { apiAddImage$ } from '../api-gateway/image-api-gateway.functions';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';

@Injectable()
export class AddImageActivityProvider {
  addImage$(
    env: Env,
    httpService: HttpService,
    imageActivity: ImageActivity
  ): Observable<void> {
    const { state, publishedImage } = imageActivity;
    return downloadAzureStorageBlobToFile$(
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(state, publishedImage),
      publishedImage.imageName
    ).pipe(
      tap(() =>
        Logger.log(
          `Adding image for ${publishedImage.slug}`,
          AddImageActivityProvider.name
        )
      ),
      switchMap((imageFilePath) =>
        this.addImageWithPath$(env, httpService, publishedImage, imageFilePath)
      )
    );
  }

  addImageWithPath$(
    env: Env,
    httpService: HttpService,
    publishedImage: PublishedImage,
    imageFilePath: string
  ): Observable<void> {
    return uploadStreamToAzureStorageBlob$(
      fs.createReadStream(imageFilePath),
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(ImageDimensionState.Added, publishedImage)
    ).pipe(
      switchMap(() => readCreateDateExif$(imageFilePath)),
      switchMap((createDate) =>
        apiAddImage$(env, httpService, publishedImage, createDate)
      ),
      map(() => Logger.log('AddImage complete', AddImageActivityProvider.name))
    );
  }
}
