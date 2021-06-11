import { HttpService } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import {
  BestOfType,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import {
  Env,
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';

export const updateNewImageDimensions = (
  env: Env,
  httpService: HttpService,
  publishedImage: PublishedImage,
  imageDimensionType: ImageDimensionType,
  width: number,
  height: number
): Observable<unknown> => {
  const imageName = publishedImage.imageName;
  const slug = imageName.substring(0, imageName.indexOf('.'));
  switch (publishedImage.publishServiceType) {
    case PublishServiceType.BestOf:
      return updateBestOfImageDimensions$(
        publishedImage.publishedCollectionSetName as BestOfType,
        imageDimensionType,
        slug,
        width,
        height,
        env,
        httpService
      );
    default:
      return of();
  }
};
