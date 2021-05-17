import { Injectable, Inject, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import {
  Env,
  ImageProcessActivity,
} from '@dark-rush-photography/serverless/types';
import {
  exifImage,
  exifImageArtist,
  getBlobPath,
} from '@dark-rush-photography/serverless/util';
import {
  downloadBlob,
  uploadBlobFromBuffer,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class ExifImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async exifImage(
    imageProcessActivity: ImageProcessActivity,
    year: number
  ): Promise<ImageProcessActivity> {
    Logger.log(formatMessage('ExifImage starting'));

    Logger.log(formatMessage('ExifImage downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'private',
      getBlobPath('uploaded-image', imageProcessActivity.publishedImage),
      imageProcessActivity.publishedImage.imageName
    );

    Logger.log(formatMessage('ExifImage executing'));
    const buffer = await exifImageArtist(
      this.env.getImageArtistExifConfig,
      imageFilePath
    );

    Logger.log(formatMessage('ExifImage uploading exifed image'));

    const exifedImageProcess: ImageProcessActivity = {
      type: 'exifed-image',
      publishedImage: imageProcessActivity.publishedImage,
    };

    //const exifedPublishedImage = updatePublishedImageWithImageProcess('exifed', publishedImage);
    //await uploadBlobFromBuffer(
    //  this.env.azureStorageConnectionString,
    //  'uploads',
    //  getBlobPath(tinifiedPublishedImage),
    //  Buffer.from(buffer)
    //);

    Logger.log(formatMessage('ExifImage complete'));
    return exifedImageProcess;
  }
}
