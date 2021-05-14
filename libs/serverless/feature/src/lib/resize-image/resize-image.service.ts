import * as fs from 'fs-extra';

import { Injectable, Inject, Logger } from '@nestjs/common';

import * as E from 'fp-ts/Either';

import { ENV } from '@dark-rush-photography/shared-server/types';
import { formatMessage } from '@dark-rush-photography/shared-server/util';
import {
  Env,
  PublishedImage,
  TileImageDimension,
} from '@dark-rush-photography/serverless/types';
import {
  getPublishedImageBlobPath,
  resizeImageTile,
  updatePublishedImageWithImageProcess,
  updatePublishedImageWithImageDimension,
} from '@dark-rush-photography/serverless/util';
import {
  downloadBlob,
  uploadBlobFromStream,
} from '@dark-rush-photography/shared-server/data';

@Injectable()
export class ResizeImageService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  async resizeImage(publishedImage: PublishedImage): Promise<PublishedImage> {
    Logger.log(formatMessage('ResizeImage starting'));

    if (!publishedImage.resizeImageDimensionType) throw new Error();

    Logger.log(formatMessage('ResizeImage downloading image blob'));
    const imageFilePath = await downloadBlob(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(publishedImage),
      publishedImage.imageName
    );

    const tileImageDimension = this.env.imageDimensionsConfig.find(
      (imageDimension) => imageDimension.type === 'Tile'
    );

    Logger.log(formatMessage('ResizeImage executing'));
    const imageFilePathEither = await resizeImageTile(
      imageFilePath,
      publishedImage.imageName,
      tileImageDimension as TileImageDimension
    );
    if (E.isLeft(imageFilePathEither)) throw imageFilePathEither.left;

    Logger.log(formatMessage('ResizeImage uploading resized image'));
    const resizedPublishedImage = updatePublishedImageWithImageProcess(
      publishedImage,
      'resized-image'
    );
    const dimensionedPublishedImage = updatePublishedImageWithImageDimension(
      resizedPublishedImage,
      publishedImage.resizeImageDimensionType
    );

    await uploadBlobFromStream(
      this.env.azureStorageConnectionString,
      'uploads',
      getPublishedImageBlobPath(dimensionedPublishedImage),
      fs.createReadStream(imageFilePathEither.right)
    );

    Logger.log(formatMessage('ResizeImage complete'));
    return resizedPublishedImage;
  }
}
