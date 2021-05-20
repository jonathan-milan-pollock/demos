import { AzureRequest } from '@nestjs/azure-func-http';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';

import { ENV } from '@dark-rush-photography/shared-types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import { uploadBlobFromBuffer } from '@dark-rush-photography/shared-server/data';
import {
  Env,
  ImageProcessActivity,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  getPublishedImageForUploadedImage,
} from '@dark-rush-photography/serverless/util';

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

    if (!publishedImage) throw new Error('Publish image was not from upload');

    await uploadBlobFromBuffer(
      this.env.azureStorageConnectionString,
      'private',
      getBlobPath('uploaded-image', publishedImage),
      image.buffer
    );

    Logger.log(formatMessage('UploadImage starting image upload orchestrator'));
    const client = getClient(request.context);
    const instanceId = await client.startNew(
      'UploadImageOrchestrator',
      undefined,
      {
        type: 'uploaded-image',
        publishedImage: publishedImage,
      } as ImageProcessActivity
    );
    request.context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(
      request.context.bindingData.req,
      instanceId
    );
  }
}
