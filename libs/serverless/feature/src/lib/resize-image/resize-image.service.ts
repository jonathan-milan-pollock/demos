import * as fs from 'fs-extra';

import { Injectable, Inject, Logger } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import {
  Env,
  ImageProcessActivity,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  resizeImage,
  getBlobPathWithImageDimension,
} from '@dark-rush-photography/serverless/util';
import {
  downloadBlob,
  getBlobsNames,
  uploadBlobFromStream,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class ResizeImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async resizeImage(
    imageProcessActivity: ImageProcessActivity
  ): Promise<ImageProcessActivity> {
    Logger.log(formatMessage('ResizeImage starting'));

    if (imageProcessActivity.data?.resizeImageDimensionType === undefined) {
      throw new Error(
        'resize image dimension type must be set for resizing image'
      );
    }

    const {
      type: imageProcessActivityType,
      publishedImage,
      data,
    } = imageProcessActivity;

    Logger.log(formatMessage('ResizeImage downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'private',
      getBlobPath(imageProcessActivityType, publishedImage),
      publishedImage.imageName
    );

    const imageDimension = this.env.imageDimensionsConfig.find(
      (imageDimension) => imageDimension.type === data.resizeImageDimensionType
    );
    if (!imageDimension) throw new Error('Could not find image dimension');

    Logger.log(formatMessage('ResizeImage executing'));
    const imageFilePathEither = await resizeImage(
      imageFilePath,
      publishedImage.imageName,
      imageDimension
    );

    if (E.isLeft(imageFilePathEither)) throw imageFilePathEither.left;

    Logger.log(formatMessage('ResizeImage uploading resized image'));
    await uploadBlobFromStream(
      this.env.azureStorageConnectionString,
      'private',
      getBlobPathWithImageDimension(
        'resized-image',
        publishedImage,
        imageDimension.type
      ),
      fs.createReadStream(imageFilePathEither.right)
    );

    Logger.log(formatMessage('ResizeImage complete'));
    return {
      type: 'resized-image',
      publishedImage: publishedImage,
    };
  }
}
