import { HttpService } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import {
  ImageDimensionPixels,
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import {
  Env,
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';
import { addOrUpdateAboutImageDimension$ } from '../api/about-api.functions';

export const apiAddOrUpdateImageDimension$ = (
  env: Env,
  httpService: HttpService,
  publishedImage: PublishedImage,
  type: ImageDimensionType,
  state: ImageDimensionState,
  pixels: ImageDimensionPixels
): Observable<unknown> => {
  switch (publishedImage.publishServiceType) {
    case PublishServiceType.About:
      return addOrUpdateAboutImageDimension$(
        env,
        httpService,
        publishedImage.slug,
        publishedImage.imageName,
        type,
        state,
        pixels
      );
  }
  return of();
};
