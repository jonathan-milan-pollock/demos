import { HttpService } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import {
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
  imageDimensionType: ImageDimensionType,
  imageDimensionState: ImageDimensionState,
  width: number,
  height: number
): Observable<unknown> => {
  switch (publishedImage.publishServiceType) {
    case PublishServiceType.About:
      return addOrUpdateAboutImageDimension$(
        env,
        httpService,
        publishedImage.slug,
        publishedImage.imageName,
        imageDimensionType,
        imageDimensionState,
        width,
        height
      );
  }
  return of();
};
