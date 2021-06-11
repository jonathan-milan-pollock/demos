import {
  PublishedImage,
  PublishServiceType,
} from '@dark-rush-photography/serverless/types';
import {
  getPublishServiceName,
  getPublishServiceType,
} from './publish-service.functions';

export const getPublishedImageForUpload = (
  uploadImageFileName: string
): PublishedImage | undefined => {
  if (!uploadImageFileName)
    throw new Error('image upload file name must be provided');

  const fileNameSections = uploadImageFileName.split('|&|');
  if (fileNameSections.length === 0)
    throw new Error('|&| must be used to separate publish service segments');

  const publishServiceName = getPublishServiceName(fileNameSections[0]);
  const publishServiceType = getPublishServiceType(publishServiceName);
  if (!publishServiceType)
    throw new Error(`Publish service type ${publishServiceType} was not found`);

  return getPublishedImageForUploadedImageFileNameSections(
    publishServiceType,
    fileNameSections
  );
};

export const getPublishedImageForUploadedImageFileNameSections = (
  publishServiceType: PublishServiceType,
  uploadedImageFileNameSections: string[]
): PublishedImage | undefined => {
  const publishedImageFn = publishedImageMap.get(publishServiceType);
  return publishedImageFn
    ? publishedImageFn(uploadedImageFileNameSections)
    : undefined;
};

export const getBestOfImagesPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.BestOf,
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getFavoritesPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Favorites,
    publishedCollectionName: uploadedImageFileNameSections[1],
    imageName: uploadedImageFileNameSections[2],
  };
};

export const getAboutPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.About,
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getReviewsPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Reviews,
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getReviewPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Review,
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getPhotoOfTheWeekPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.PhotoOfTheWeek,
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

export const getEventsPublishedImage = (
  uploadedImageFileNameSections: string[]
): PublishedImage => {
  return {
    publishServiceType: PublishServiceType.Events,
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
    publishServiceType: PublishServiceType.Destinations,
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
    publishServiceType: PublishServiceType.SocialMedia,
    publishedCollectionSetName: uploadedImageFileNameSections[1],
    publishedCollectionName: uploadedImageFileNameSections[2],
    imageName: uploadedImageFileNameSections[3],
  };
};

const publishedImageMap = new Map<
  string,
  (uploadedImageFileNameSections: string[]) => PublishedImage
>([
  ['BestOfImages', getBestOfImagesPublishedImage],
  ['Home', getFavoritesPublishedImage],
  ['About', getAboutPublishedImage],
  ['Reviews', getReviewsPublishedImage],
  ['Review', getReviewPublishedImage],
  ['Event', getEventsPublishedImage],
  ['PhotoOfTheWeek', getPhotoOfTheWeekPublishedImage],
  ['Destinations', getDestinationsPublishedImage],
  ['SocialMedia', getSocialMediaPublishedImage],
]);
