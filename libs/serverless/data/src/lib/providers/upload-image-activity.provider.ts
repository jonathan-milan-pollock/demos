import {
  Logger,
  BadRequestException,
  HttpService,
  Injectable,
} from '@nestjs/common';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';
import { Env, ImageActivity } from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  getPublishedImageForUpload,
} from '@dark-rush-photography/serverless/util';
import { uploadBufferToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';
import { ImageDimensionState } from '@dark-rush-photography/shared-types';
import { apiCreateEntity$ } from '../apis/api-gateway/create-entity.functions';

@Injectable()
export class UploadImageActivityProvider {
  process$(
    env: Env,
    httpService: HttpService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestContext: Record<string, any>,
    uploadedFileName: string,
    image: Express.Multer.File
  ): Observable<IHttpResponse> {
    const logContext = 'UploadImageActivityProvider';
    if (!image) {
      throw new BadRequestException('Image must be provided for image upload');
    }

    const publishedImage = getPublishedImageForUpload(uploadedFileName);
    if (!publishedImage)
      throw new BadRequestException(
        'Publish image was not created from upload'
      );
    Logger.log('Published image was created from upload', logContext);

    const client = getClient(requestContext);
    return uploadBufferToAzureStorageBlob$(
      image.buffer,
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(ImageDimensionState.Uploaded, publishedImage)
    ).pipe(
      tap(() => Logger.log('Starting upload image orchestrator', logContext)),
      switchMap(() => apiCreateEntity$(env, httpService, publishedImage)),
      switchMap(() =>
        from(
          client.startNew('UploadImageOrchestrator', undefined, {
            state: ImageDimensionState.Uploaded,
            publishedImage: publishedImage,
          } as ImageActivity)
        )
      ),
      tap((instanceId: string) =>
        Logger.log(
          `UploadImageOrchestrator started orchestration with ID = '${instanceId}'.`,
          logContext
        )
      ),
      map((instanceId: string) =>
        client.createCheckStatusResponse(
          requestContext.bindingData.req,
          instanceId
        )
      )
    );
  }
}
