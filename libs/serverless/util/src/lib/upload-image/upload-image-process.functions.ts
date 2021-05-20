import {
  PublishServiceType,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';

import {
  getAboutPublishedImage,
  getBestOfImagesPublishedImage,
  getDestinationsPublishedImage,
  getEventsPublishedImage,
  getHomePublishedImage,
  getPhotoOfTheWeekPublishedImage,
  getReviewPublishedImage,
  getReviewsPublishedImage,
  getSocialMediaPublishedImage,
} from './publish-service-image.functions';

export const getPublishServiceName = (
  firstUploadedImageFileNameSection: string
): string =>
  firstUploadedImageFileNameSection.toLowerCase().replace(/\s+/g, '');

const publishServiceNameMap = new Map<string, PublishServiceType>([
  ['bestofimages', 'BestOfImages'],
  ['home', 'Home'],
  ['about', 'About'],
  ['reviews', 'Reviews'],
  ['review', 'Review'],
  ['events', 'Events'],
  ['photo-of-the-week', 'PhotoOfTheWeek'],
  ['destinations', 'Destinations'],
  ['socialmedia', 'SocialMedia'],
]);

export const getPublishServiceType = (
  publishServiceName: string
): PublishServiceType | undefined =>
  publishServiceNameMap.get(publishServiceName);

const publishedImageMap = new Map<
  string,
  (uploadedImageFileNameSections: string[]) => PublishedImage
>([
  ['BestOfImages', getBestOfImagesPublishedImage],
  ['Home', getHomePublishedImage],
  ['About', getAboutPublishedImage],
  ['Reviews', getReviewsPublishedImage],
  ['Review', getReviewPublishedImage],
  ['Event', getEventsPublishedImage],
  ['PhotoOfTheWeek', getPhotoOfTheWeekPublishedImage],
  ['Destinations', getDestinationsPublishedImage],
  ['SocialMedia', getSocialMediaPublishedImage],
]);

export const getPublishedImageForUploadedImageFileNameSections = (
  publishServiceType: PublishServiceType,
  uploadedImageFileNameSections: string[]
): PublishedImage | undefined => {
  const publishedImageFn = publishedImageMap.get(publishServiceType);
  return publishedImageFn
    ? publishedImageFn(uploadedImageFileNameSections)
    : undefined;
};
