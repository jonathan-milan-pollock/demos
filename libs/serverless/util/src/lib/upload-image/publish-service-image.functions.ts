import { PublishedImage } from '@dark-rush-photography/serverless/types';

export const getBestOfImagesPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'BestOfImages',
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getHomePublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Home',
    publishedCollectionName: uploadedImageFileNameSections[1],
    imageName: uploadedImageFileNameSections[2],
  };
};

export const getAboutPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'About',
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getReviewsPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Reviews',
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getReviewPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Review',
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getPhotoOfTheWeekPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'PhotoOfTheWeek',
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getEventsPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Events',
    publishedCollectionSetParentName: uploadedImageFileNameSections[2],
    publishedCollectionSetName: uploadedImageFileNameSections[3],
    publishedCollectionName: uploadedImageFileNameSections[4],
    imageName: uploadedImageFileNameSections[5],
  };
};

export const getDestinationsPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Destinations',
    publishedCollectionSetParentName: uploadedImageFileNameSections[1],
    publishedCollectionSetName: uploadedImageFileNameSections[2],
    publishedCollectionName: uploadedImageFileNameSections[3],
    imageName: uploadedImageFileNameSections[4],
  };
};

export const getSocialMediaPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'SocialMedia',
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};
