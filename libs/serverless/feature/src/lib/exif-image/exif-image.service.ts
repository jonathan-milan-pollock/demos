import { Injectable, Inject, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import {
  Env,
  ImageProcess,
  IMAGE_ARTIST_EXIF_FN,
} from '@dark-rush-photography/serverless/types';
import {
  exifImage,
  exifImageArtist,
  getBlobPath,
} from '@dark-rush-photography/serverless/data';

@Injectable()
export class ExifImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async exifImage(imageProcess: ImageProcess): Promise<ImageProcess> {
    //  Logger.log(formatMessage('ExifImage starting'));

    // Logger.log(formatMessage('ExifImage downloading image blob'));
    //const imageFilePath = await downloadBlob(
    //  this.env.azureStorageConnectionString,
    //  'private',
    //  getBlobPath('uploaded-image', imageProcess.publishedImage),
    //  imageProcess.publishedImage.imageName
    //);

    //Logger.log(formatMessage('ExifImage executing'));
    //const buffer = await exifImageArtist(IMAGE_ARTIST_EXIF_FN, imageFilePath);

    //Logger.log(formatMessage('ExifImage uploading exifed image'));

    const exifedImageProcess: ImageProcess = {
      type: 'exifed-image',
      publishedImage: imageProcess.publishedImage,
    };

    //const exifedPublishedImage = updatePublishedImageWithImageProcess('exifed', publishedImage);
    //await uploadBlobFromBuffer(
    //  this.env.azureStorageConnectionString,
    //  'uploads',
    //  getBlobPath(tinifiedPublishedImage),
    //  Buffer.from(buffer)
    //);

    //    Logger.log(formatMessage('ExifImage complete'));
    return exifedImageProcess;
  }
}
