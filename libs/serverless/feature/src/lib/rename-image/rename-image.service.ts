import { Injectable, Inject, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-server/types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import { Env, PublishedImage } from '@dark-rush-photography/serverless/types';
import {
  getPublishedImageBlobPath,
  tinifyImage,
  updatePublishedImageWithImageProcess,
} from '@dark-rush-photography/serverless/util';
import {
  downloadBlob,
  uploadBlobFromBuffer,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class ResizeImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async resizeImage(publishedImage: PublishedImage): Promise<PublishedImage> {
    Logger.log(formatMessage('ResizeImage starting'));

    Logger.log(formatMessage('ResizeImage downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(publishedImage),
      publishedImage.imageName
    );

    Logger.log(formatMessage('ResizeImage executing'));
    //const buffer = await tinifyImage(this.env.tinyPngApiKey, imageFilePath);

    Logger.log(formatMessage('ResizeImage uploading resized image'));
    const resizedPublishedImage = updatePublishedImageWithImageProcess(
      publishedImage,
      'resized-image'
    );
    //await uploadBlobFromBuffer(
    //  this.env.azureStorageConnectionString,
    //  'uploads',
    //  getPublishedImageBlobPath(tinifiedPublishedImage),
    //  Buffer.from(buffer)
    //);

    Logger.log(formatMessage('ResizeImage complete'));
    return resizedPublishedImage;
  }
}
