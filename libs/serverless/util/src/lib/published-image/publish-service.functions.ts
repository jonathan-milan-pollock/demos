import * as E from 'fp-ts/Either';

import { PublishServiceType } from '@dark-rush-photography/serverless/types';

export const getPublishServiceName = (
  firstImageUploadFileNameSection: string
): string => firstImageUploadFileNameSection.toLowerCase().replace(/\s+/g, '');

export const getPublishServiceType = (
  publishServiceName: string
): E.Either<Error, PublishServiceType> => {
  switch (publishServiceName) {
    case 'bestofimages':
      return E.right('BestOfImages');
    case 'home':
      return E.right('Home');
    case 'about':
      return E.right('About');
    case 'reviews':
      return E.right('Reviews');
    case 'review':
      return E.right('Reviews');
    case 'events':
      return E.right('Events');
    case 'photo-of-the-week':
      return E.right('PhotoOfTheWeek');
    case 'destinations':
      return E.right('Destinations');
    case 'socialmedia':
      return E.right('SocialMedia');
    default:
      return E.left(new Error());
  }
};
