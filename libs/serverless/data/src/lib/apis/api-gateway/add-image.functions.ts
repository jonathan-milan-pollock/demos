import { HttpService, Logger } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import {
  Env,
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';
import { addAboutImage$ } from '../api/about-api.functions';

export const apiAddImage$ = (
  env: Env,
  httpService: HttpService,
  publishedImage: PublishedImage,
  createDate: string
): Observable<unknown> => {
  Logger.log('createDate', createDate);

  switch (publishedImage.publishServiceType) {
    case PublishServiceType.About:
      return addAboutImage$(
        env,
        httpService,
        publishedImage.slug,
        publishedImage.imageName,
        createDate
      );
  }
  return of();
};
