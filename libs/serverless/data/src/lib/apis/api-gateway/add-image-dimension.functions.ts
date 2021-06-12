import { HttpService } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import {
  Env,
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';
import { createAboutIfNotExists$ } from '../api/about-api.functions';

export const apiAddImageDimension$ = (
  env: Env,
  httpService: HttpService,
  publishedImage: PublishedImage
): Observable<unknown> => {
  switch (publishedImage.publishServiceType) {
    case PublishServiceType.About:
      return createAboutIfNotExists$(env, httpService, publishedImage.slug);
  }
  return of();
};
