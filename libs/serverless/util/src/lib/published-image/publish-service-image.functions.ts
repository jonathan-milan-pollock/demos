import { PublishedImage } from '@dark-rush-photography/serverless/types';

export const getBestOfImagesPublishedImage = (
  imageUploadFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'BestOfImages',
    imageProcessType: 'uploads',
    publishedCollectionSetName: imageUploadFileNameSections[1],
    publishedCollectionName: imageUploadFileNameSections[2],
    imageName: imageUploadFileNameSections[3],
  };
};

export const getHomePublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Home',
    imageProcessType: 'uploads',
    publishedCollectionSetName: fileNameSections[1],
    publishedCollectionName: fileNameSections[2],
    imageName: fileNameSections[3],
  };
};

export const getAboutPublishedImage = (
  imageUploadFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'About',
    imageProcessType: 'uploads',
    publishedCollectionSetName: imageUploadFileNameSections[1],
    publishedCollectionName: imageUploadFileNameSections[2],
    imageName: imageUploadFileNameSections[3],
  };
};

export const getReviewsPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Reviews',
    imageProcessType: 'uploads',
    publishedCollectionSetName: fileNameSections[1],
    publishedCollectionName: fileNameSections[2],
    imageName: fileNameSections[3],
  };
};

export const getReviewPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Review',
    imageProcessType: 'uploads',
    publishedCollectionSetName: fileNameSections[1],
    publishedCollectionName: fileNameSections[2],
    imageName: fileNameSections[3],
  };
};

export const getPhotoOfTheWeekPublishedImage = (
  imageUploadFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'PhotoOfTheWeek',
    imageProcessType: 'uploads',
    publishedCollectionSetName: imageUploadFileNameSections[1],
    publishedCollectionName: imageUploadFileNameSections[2],
    imageName: imageUploadFileNameSections[3],
  };
};

export const getEventsPublishedImage = (
  imageUploadFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Events',
    imageProcessType: 'uploads',
    publishedCollectionSetParentName: imageUploadFileNameSections[2],
    publishedCollectionSetName: imageUploadFileNameSections[3],
    publishedCollectionName: imageUploadFileNameSections[4],
    imageName: imageUploadFileNameSections[5],
  };
};

export const getDestinationsPublishedImage = (
  imageUploadFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'Destinations',
    imageProcessType: 'uploads',
    publishedCollectionSetParentName: imageUploadFileNameSections[1],
    publishedCollectionSetName: imageUploadFileNameSections[2],
    publishedCollectionName: imageUploadFileNameSections[3],
    imageName: imageUploadFileNameSections[4],
  };
};

export const getSocialMediaPublishedImage = (
  fileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: 'SocialMedia',
    imageProcessType: 'uploads',
    publishedCollectionSetName: fileNameSections[1],
    publishedCollectionName: fileNameSections[2],
    imageName: fileNameSections[3],
  };
};
