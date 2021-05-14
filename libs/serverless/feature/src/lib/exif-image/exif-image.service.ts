import { Injectable, Inject, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-server/types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import { Env, PublishedImage } from '@dark-rush-photography/serverless/types';
import {
  exifImage,
  exifImageArtist,
  getPublishedImageBlobPath,
} from '@dark-rush-photography/serverless/util';
import {
  downloadBlob,
  uploadBlobFromBuffer,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class ExifImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async exifImage(
    publishedImage: PublishedImage,
    year: number
  ): Promise<PublishedImage> {
    Logger.log(formatMessage('ExifImage starting'));

    Logger.log(formatMessage('ExifImage downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(publishedImage),
      publishedImage.imageName
    );

    Logger.log(formatMessage('ExifImage executing'));
    const buffer = await exifImageArtist(
      this.env.getImageArtistExifConfig,
      imageFilePath
    );

    Logger.log(formatMessage('ExifImage uploading exifed image'));
    //const exifedPublishedImage = updatePublishedImageWithImageProcess('exifed', publishedImage);
    //await uploadBlobFromBuffer(
    //  this.env.azureStorageConnectionString,
    //  'uploads',
    //  getPublishedImageBlobPath(tinifiedPublishedImage),
    //  Buffer.from(buffer)
    //);

    Logger.log(formatMessage('ExifImage complete'));
    return publishedImage;
  }
}
