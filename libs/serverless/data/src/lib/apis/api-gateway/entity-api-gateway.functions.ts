import { HttpService } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import {
  Env,
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';
import { createAboutIfNotExists$ } from '../api/about-api.functions';
import { createBestOfIfNotExists$ } from '../api/best-of-api.functions';

export const apiCreateEntity$ = (
  env: Env,
  httpService: HttpService,
  publishedImage: PublishedImage
): Observable<unknown> => {
  switch (publishedImage.publishServiceType) {
    case PublishServiceType.About:
      return createAboutIfNotExists$(env, httpService, publishedImage.slug);
    case PublishServiceType.BestOf:
      return createBestOfIfNotExists$(env, httpService, publishedImage.slug);
  }
  return of();
};
