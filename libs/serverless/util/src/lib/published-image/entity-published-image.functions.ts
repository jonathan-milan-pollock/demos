import {
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';

export const getAboutPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.About,
    slug: fileNameSections[1].toLowerCase(),
    imageName: fileNameSections[3].toLowerCase(),
  };
};

export const getBestOfPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.BestOf,
    slug: fileNameSections[1].toLowerCase(),
    imageName: fileNameSections[3].toLowerCase(),
  };
};

export const getDestinationsPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Destinations,
    slug: fileNameSections[1].toLowerCase(),
    imageName: fileNameSections[3].toLowerCase(),
  };
};

export const getEventsPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Events,
    group: fileNameSections[2].toLowerCase(),
    slug: fileNameSections[3].toLowerCase(),
    imageName: fileNameSections[4].toLowerCase(),
  };
};

export const getFavoritesPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Favorites,
    slug: 'images',
    imageName: fileNameSections[2].toLowerCase(),
  };
};

export const getPhotoOfTheWeekPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.PhotoOfTheWeek,
    group: fileNameSections[1].toLowerCase(),
    slug: fileNameSections[2].toLowerCase(),
    imageName: fileNameSections[3].toLowerCase(),
  };
};

export const getReviewPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Review,
    slug: fileNameSections[1].toLowerCase(),
    imageName: fileNameSections[2].toLowerCase(),
  };
};

export const getReviewsPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Reviews,
    slug: fileNameSections[1].toLowerCase(),
    imageName: fileNameSections[2].toLowerCase(),
  };
};

export const getSocialMediaPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.SocialMedia,
    slug: fileNameSections[1].toLowerCase(),
    imageName: fileNameSections[2].toLowerCase(),
  };
};
