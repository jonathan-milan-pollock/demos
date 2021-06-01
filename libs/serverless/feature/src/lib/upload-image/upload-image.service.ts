import { AzureRequest } from '@nestjs/azure-func-http';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env, ImageProcess } from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  getPublishedImageForUploadedImage,
} from '@dark-rush-photography/serverless/data';
import {
  uploadBufferToAzureStorageBlob$,
  formatMessage,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class UploadImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async uploadImage(
    image: Express.Multer.File,
    request: AzureRequest
  ): Promise<IHttpResponse> {
    Logger.log(formatMessage('UploadImage executing'));
    const fileName = request.body['fileName'];

    const publishedImage = getPublishedImageForUploadedImage(fileName);
    if (!publishedImage)
      throw new Error('Publish image was not created from upload');

    const client = getClient(request.context);

    return uploadBufferToAzureStorageBlob$(
      image.buffer,
      this.env.azureStorageConnectionString,
      'private',
      getBlobPath('uploaded-image', publishedImage)
    )
      .pipe(
        tap(() =>
          Logger.log(
            formatMessage('UploadImage starting image upload orchestrator')
          )
        ),
        switchMap(() =>
          from(
            client.startNew('UploadImageOrchestrator', undefined, {
              type: 'uploaded-image',
              publishedImage: publishedImage,
            } as ImageProcess)
          )
        ),
        tap((instanceId) =>
          Logger.log(
            formatMessage(`Started orchestration with ID = '${instanceId}'.`)
          )
        ),
        map((instanceId) =>
          client.createCheckStatusResponse(
            request.context.bindingData.req,
            instanceId
          )
        )
      )
      .toPromise();
  }
}
