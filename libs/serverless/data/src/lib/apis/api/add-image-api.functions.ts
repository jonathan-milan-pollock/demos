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
import { addBestOfImage$ } from './best-of-api.functions';
import { addFavoriteImage$ } from './favorites-api.functions';
import { addAboutImage$ } from './about-api.functions';

import { addDestinationImage$ } from './destinations-api.functions';
import { addEventImage$ } from './events-api.functions';

import { addPhotoOfTheWeekImage$ } from './photo-of-the-week-api.functions';
import { addReviewsImage$ } from './reviews-api.functions';

export const addNewImage = (
  env: Env,
  httpService: HttpService,
  publishedImage: PublishedImage
): Observable<unknown> => {
  const imageName = publishedImage.imageName;
  const slug = imageName.substring(0, imageName.indexOf('.'));
  switch (publishedImage.publishServiceType) {
    case PublishServiceType.BestOf:
      return addBestOfImage$(
        env,
        httpService,
        publishedImage.publishedCollectionSetName as BestOfType,
        slug
      );
    case PublishServiceType.Favorites:
      return addFavoriteImage$(env, httpService, slug);
    case PublishServiceType.About:
      if (!publishedImage.publishedCollectionSetName)
        throw new Error('Published collection set name is required for About');

      return addAboutImage$(
        env,
        httpService,
        publishedImage.publishedCollectionSetName,
        slug
      );
    case PublishServiceType.Reviews:
      if (!publishedImage.publishedCollectionSetName)
        throw new Error('Published collection set name is required for About');

      return addReviewsImage$(
        env,
        httpService,
        publishedImage.publishedCollectionSetName,
        slug
      );
    default:
      return of();
  }
};
