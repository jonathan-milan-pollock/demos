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
import { Env } from '@dark-rush-photography/serverless/types';
import {
  formatMessage,
  getBlobPath,
  getPublishedImageForUpload,
} from '@dark-rush-photography/serverless/util';
import { uploadBufferToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';
import { ImageProcessState } from '@dark-rush-photography/shared-types';

@Injectable()
export class UploadImageProcessService {
  process$(
    env: Env,
    httpService: HttpService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestContext: Record<string, any>,
    uploadedFileName: string,
    image: Express.Multer.File
  ): Observable<IHttpResponse> {
    Logger.log(formatMessage('UploadImage executing'));

    const publishedImage = getPublishedImageForUpload(uploadedFileName);
    if (!publishedImage)
      throw new BadRequestException(
        'Publish image was not created from upload'
      );

    const client = getClient(requestContext);
    return uploadBufferToAzureStorageBlob$(
      image.buffer,
      env.azureStorageConnectionString,
      AzureStorageContainerType.Private,
      getBlobPath(ImageProcessState.Uploaded, publishedImage)
    ).pipe(
      tap(() =>
        Logger.log(
          formatMessage('UploadImage starting upload image orchestrator')
        )
      ),
      switchMap(() =>
        from(
          client.startNew('UploadImageOrchestrator', undefined, {
            type: ImageProcessState.Uploaded,
            publishedImage: publishedImage,
          })
        )
      ),
      tap((instanceId: string) =>
        Logger.log(
          formatMessage(
            `UploadImageOrchestrator started orchestration with ID = '${instanceId}'.`
          )
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
