import {
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';
import {
  getPublishServiceName,
  getPublishServiceType,
} from './publish-service.functions';

import { BadRequestException, Logger } from '@nestjs/common';
import {
  getAboutPublishedImage,
  getBestOfPublishedImage,
  getDestinationsPublishedImage,
  getEventsPublishedImage,
  getFavoritesPublishedImage,
  getPhotoOfTheWeekPublishedImage,
  getReviewPublishedImage,
  getReviewsPublishedImage,
  getSocialMediaPublishedImage,
} from './entity-published-image.functions';

const publishedImageMap = new Map<
  string,
  (fileNameSections: string[]) => PublishedImage
>([
  [PublishServiceType.About, getAboutPublishedImage],
  [PublishServiceType.BestOf, getBestOfPublishedImage],
  [PublishServiceType.Destinations, getDestinationsPublishedImage],
  [PublishServiceType.Events, getEventsPublishedImage],
  [PublishServiceType.Favorites, getFavoritesPublishedImage],
  [PublishServiceType.PhotoOfTheWeek, getPhotoOfTheWeekPublishedImage],
  [PublishServiceType.Review, getReviewPublishedImage],
  [PublishServiceType.Reviews, getReviewsPublishedImage],
  [PublishServiceType.SocialMedia, getSocialMediaPublishedImage],
]);

export const getPublishedImageForUpload = (
  uploadImageFileName: string
): PublishedImage | undefined => {
  if (!uploadImageFileName)
    throw new Error('image upload file name must be provided');
  Logger.log(
    `Uploaded image file name: ${uploadImageFileName}`,
    getPublishedImageForUpload.name
  );

  const fileNameSections = uploadImageFileName.split('---');
  if (fileNameSections.length === 0)
    throw new Error('--- is required to separate publish service segments');

  const publishServiceName = getPublishServiceName(fileNameSections[0]);
  Logger.log(
    `Publish service name: ${publishServiceName}`,
    getPublishedImageForUpload.name
  );

  const publishServiceType = getPublishServiceType(publishServiceName);
  if (!publishServiceType)
    throw new Error(`Publish service type ${publishServiceType} was not found`);
  Logger.log(
    `Publish service type ${publishServiceType}`,
    getPublishedImageForUpload.name
  );

  return getPublishedImageFromFileNameSections(
    publishServiceType,
    fileNameSections
  );
};

export const getPublishedImageFromFileNameSections = (
  publishServiceType: PublishServiceType,
  fileNameSections: string[]
): PublishedImage | undefined => {
  const publishedImageFn = publishedImageMap.get(publishServiceType);
  if (!publishedImageFn) {
    Logger.log(
      `Unable to find publishedImageFn`,
      getPublishedImageFromFileNameSections.name
    );
    throw new BadRequestException('Unable to find published image');
  }

  return publishedImageFn(fileNameSections);
};
