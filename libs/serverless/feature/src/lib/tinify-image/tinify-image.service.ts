import { Injectable, Inject, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import {
  Env,
  ImageProcessActivity,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  tinifyImage,
} from '@dark-rush-photography/serverless/util';
import {
  downloadBlob,
  uploadBlobFromBuffer,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class TinifyImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async tinifyImage(
    imageProcessActivity: ImageProcessActivity
  ): Promise<ImageProcessActivity> {
    Logger.log(formatMessage('TinifyImage starting'));

    const {
      type: imageProcessActivityType,
      publishedImage,
    } = imageProcessActivity;

    Logger.log(formatMessage('TinifyImage downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'private',
      getBlobPath(imageProcessActivityType, publishedImage),
      publishedImage.imageName
    );

    Logger.log(formatMessage('TinifyImage executing'));
    const buffer = await tinifyImage(imageFilePath, this.env.tinyPngApiKey);

    Logger.log(formatMessage('TinifyImage uploading tinified image'));
    await uploadBlobFromBuffer(
      this.env.azureStorageConnectionString,
      'private',
      getBlobPath('tinified-image', publishedImage),
      Buffer.from(buffer)
    );

    Logger.log(formatMessage('TinifyImage complete'));
    return {
      type: 'tinified-image',
      publishedImage: publishedImage,
    };
  }
}
