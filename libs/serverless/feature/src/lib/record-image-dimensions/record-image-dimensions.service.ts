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
export class RecordImageDimensionsService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async recordImageDimensions(
    publishedImage: PublishedImage
  ): Promise<PublishedImage> {
    Logger.log(formatMessage('RecordImageDimensions starting'));

    Logger.log(formatMessage('RecordImageDimensions downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(publishedImage),
      publishedImage.imageName
    );

    Logger.log(formatMessage('RecordImageDimensions executing'));
    //const buffer = await tinifyImage(this.env.tinyPngApiKey, imageFilePath);

    Logger.log(formatMessage('RecordImageDimensions uploading recorded image'));
    const recordedPublishedImage = updatePublishedImageWithImageProcess(
      publishedImage,
      'image-dimensions-recorded'
    );
    //await uploadBlobFromBuffer(
    //  this.env.azureStorageConnectionString,
    //  'uploads',
    //  getPublishedImageBlobPath(tinifiedPublishedImage),
    //  Buffer.from(buffer)
    //);

    Logger.log(formatMessage('RecordImageDimensions complete'));
    return recordedPublishedImage;
  }
}
