import { PublishServiceType } from '@dark-rush-photography/serverless/types';

export const getPublishServiceName = (
  firstUploadedImageFileNameSection: string
): string =>
  firstUploadedImageFileNameSection.toLowerCase().replace(/\s+/g, '');

const publishServiceNameMap = new Map<string, PublishServiceType>([
  ['bestof', PublishServiceType.BestOf],
  ['favorites', PublishServiceType.Favorites],
  ['about', PublishServiceType.About],
  ['reviews', PublishServiceType.Reviews],
  ['review', PublishServiceType.Review],
  ['events', PublishServiceType.Events],
  ['photo-of-the-week', PublishServiceType.PhotoOfTheWeek],
  ['destinations', PublishServiceType.Destinations],
  ['socialmedia', PublishServiceType.SocialMedia],
]);

export const getPublishServiceType = (
  publishServiceName: string
): PublishServiceType | undefined =>
  publishServiceNameMap.get(publishServiceName);
