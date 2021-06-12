import { PublishServiceType } from '@dark-rush-photography/serverless/types';

export const getPublishServiceName = (firstFileNameSection: string): string =>
  firstFileNameSection.toLowerCase().replace(/\s+/g, '');

const publishServiceNameMap = new Map<string, PublishServiceType>([
  ['about', PublishServiceType.About],
  ['bestof', PublishServiceType.BestOf],
  ['destinations', PublishServiceType.Destinations],
  ['events', PublishServiceType.Events],
  ['favorites', PublishServiceType.Favorites],
  ['photooftheweek', PublishServiceType.PhotoOfTheWeek],
  ['review', PublishServiceType.Review],
  ['reviews', PublishServiceType.Reviews],
  ['socialmedia', PublishServiceType.SocialMedia],
]);

export const getPublishServiceType = (
  publishServiceName: string
): PublishServiceType | undefined =>
  publishServiceNameMap.get(publishServiceName);
