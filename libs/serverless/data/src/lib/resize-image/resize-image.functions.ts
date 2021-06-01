import * as fs from 'fs-extra';

import { Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  Env,
  ImageProcess,
  ImageProcessType,
  IMAGE_DIMENSIONS,
  ImageDimension,
  LongestEdgeImageDimension,
  TileImageDimension,
} from '@dark-rush-photography/serverless/types';
import {
  getBlobPath,
  getBlobPathWithImageDimension,
} from '../blob-path/blob-path.functions';
import { downloadAzureStorageBlobToFile$ } from '../azure-storage/azure-storage-download.functions';
import { uploadStreamToAzureStorageBlob$ } from '../azure-storage/azure-storage-upload.functions';
import { formatMessage } from '../log/log.functions';

import {} from '@dark-rush-photography/serverless/types';
import { resizeImageTile } from './resize-image-tile.functions';
import { resizeLongestEdge } from './resize-longest-edge.functions';

export const resizeImage$ = (
  imageProcess: ImageProcess,
  env: Env
): Observable<void> => {
  /**
     * if (imageProcess.data?.resizeImageDimensionType === undefined) {
      throw new Error(
        'resize image dimension type must be set for resizing image'
      );
    }
     */

  const { type, publishedImage, data: imageProcessData } = imageProcess;

  const imageDimension = IMAGE_DIMENSIONS.find(
    (imageDimension) =>
      imageDimension.type === imageProcessData?.resizeImageDimensionType
  );
  if (!imageDimension) throw new Error('Could not find image dimension');

  Logger.log(formatMessage('ResizeImage starting'));
  Logger.log(formatMessage('ResizeImage downloading image blob'));

  return downloadAzureStorageBlobToFile$(
    env.azureStorageConnectionString,
    'private',
    getBlobPath(type as ImageProcessType, publishedImage),
    publishedImage.imageName
  ).pipe(
    tap(() => Logger.log(formatMessage('ResizeImage executing'))),
    switchMap((imageFilePath) =>
      from(resizeImage(imageFilePath, publishedImage.imageName, imageDimension))
    ),
    tap(() => Logger.log(formatMessage('ResizeImage uploading resized image'))),
    switchMap((resizedImageFilePath) =>
      uploadStreamToAzureStorageBlob$(
        fs.createReadStream(resizedImageFilePath),
        env.azureStorageConnectionString,
        'private',
        getBlobPathWithImageDimension(
          'resized-image',
          publishedImage,
          imageDimension.type
        )
      )
    ),
    map(() => Logger.log(formatMessage('ResizeImage complete')))
  );
};

export const resizeImage = async (
  imageFilePath: string,
  imageName: string,
  imageDimension: ImageDimension
): Promise<string> => {
  switch (imageDimension.type) {
    case 'Tile':
      return await resizeImageTile(
        imageFilePath,
        imageName,
        imageDimension as TileImageDimension
      );
    case 'Thumbnail':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imageDimension as LongestEdgeImageDimension).longestEdge
      );
    case 'Small':
      return await resizeLongestEdge(
        imageFilePath,
        imageName,
        (imageDimension as LongestEdgeImageDimension).longestEdge
      );
    default:
      throw new Error(
        `Could not find image dimension for the type ${imageDimension.type}`
      );
  }
};
