import { HttpService } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import {
  Env,
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';
import { addAboutImage$ } from '../api/about-api.functions';
import { addBestOfImage$ } from '../api/best-of-api.functions';

export const apiAddImage$ = (
  env: Env,
  httpService: HttpService,
  publishedImage: PublishedImage,
  createDate: string
): Observable<unknown> => {
  switch (publishedImage.publishServiceType) {
    case PublishServiceType.About:
      return addAboutImage$(
        env.apiAuth,
        env.api,
        httpService,
        publishedImage.slug,
        publishedImage.imageName,
        createDate
      );
    case PublishServiceType.BestOf:
      return addBestOfImage$(
        env.apiAuth,
        env.api,
        httpService,
        publishedImage.slug,
        publishedImage.imageName,
        createDate
      );
  }
  return of();
};
