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
export class TinifyImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async tinifyImage(publishedImage: PublishedImage): Promise<PublishedImage> {
    Logger.log(formatMessage('TinifyImage starting'));

    Logger.log(formatMessage('TinifyImage downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(publishedImage),
      publishedImage.imageName
    );

    Logger.log(formatMessage('TinifyImage executing'));
    const buffer = await tinifyImage(imageFilePath, this.env.tinyPngApiKey);

    Logger.log(formatMessage('TinifyImage uploading tinified image'));
    const tinifiedPublishedImage = updatePublishedImageWithImageProcess(
      publishedImage,
      'tinified-image'
    );
    await uploadBlobFromBuffer(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(tinifiedPublishedImage),
      Buffer.from(buffer)
    );

    Logger.log(formatMessage('TinifyImage complete'));
    return tinifiedPublishedImage;
  }
}
