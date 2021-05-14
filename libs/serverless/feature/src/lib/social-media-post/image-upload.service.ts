import { AzureRequest } from '@nestjs/azure-func-http';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { getClient } from 'durable-functions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import * as E from 'fp-ts/Either';

import { ENV } from '@dark-rush-photography/shared-server/types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import { uploadBlobFromBuffer } from '@dark-rush-photography/shared-server/data';
import { Env } from '@dark-rush-photography/serverless/types';
import {
  getPublishedImageForImageUpload,
  getPublishedImageBlobPath,
} from '@dark-rush-photography/serverless/util';

@Injectable()
export class ImageUploadService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async uploadImage(
    file: Express.Multer.File,
    request: AzureRequest
  ): Promise<IHttpResponse> {
    Logger.log(formatMessage('ImageUpload executing'));
    const bestOfImagesFilePath =
      'Best of Images|&|Nature|&|Best 37|&|image1.jpg';
    const publishedImage = getPublishedImageForImageUpload(
      bestOfImagesFilePath
    );

    if (E.isLeft(publishedImage)) throw publishedImage.left;

    await uploadBlobFromBuffer(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(publishedImage.right),
      file.buffer
    );

    Logger.log(
      formatMessage('ImageUpload starting social media post orchestrator')
    );
    const client = getClient(request.context);
    const instanceId = await client.startNew(
      'SocialMediaPostOrchestrator',
      undefined,
      publishedImage.right
    );
    request.context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(
      request.context.bindingData.req,
      instanceId
    );
  }
}
