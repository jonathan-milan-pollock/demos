import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

import {
  ImageDimensionType,
  ImageProcessType,
  PublishedImage,
  PublishServiceType,
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
import {
  getPublishServiceName,
  getPublishServiceType,
} from './publish-service.functions';

export const getPublishedImageForImageUpload = (
  imageUploadFileName: string
): E.Either<Error, PublishedImage> => {
  if (!imageUploadFileName)
    return E.left(new Error('image upload file name must be provided'));

  const fileNameSections = imageUploadFileName.split('|&|');
  if (fileNameSections.length === 0)
    return E.left(
      new Error('|&| must be used to separate publish service segments')
    );

  return pipe(
    getPublishServiceName(fileNameSections[0]),
    getPublishServiceType,
    E.chainW(getPublishedImage(fileNameSections))
  );
};

export const getPublishedImage = (imageUploadFileNameSections: string[]) => (
  publishServiceType: PublishServiceType
): E.Either<Error, PublishedImage> => {
  switch (publishServiceType) {
    case 'BestOfImages':
      return E.right(
        getBestOfImagesPublishedImage(imageUploadFileNameSections)
      );
    case 'Home':
      return E.right(getHomePublishedImage(imageUploadFileNameSections));
    case 'About':
      return E.right(getAboutPublishedImage(imageUploadFileNameSections));
    case 'Reviews':
      return E.right(getReviewsPublishedImage(imageUploadFileNameSections));
    case 'Review':
      return E.right(getReviewPublishedImage(imageUploadFileNameSections));
    case 'PhotoOfTheWeek':
      return E.right(
        getPhotoOfTheWeekPublishedImage(imageUploadFileNameSections)
      );
    case 'Events':
      return E.right(getEventsPublishedImage(imageUploadFileNameSections));
    case 'Destinations':
      return E.right(
        getDestinationsPublishedImage(imageUploadFileNameSections)
      );
    case 'SocialMedia':
      return E.right(getSocialMediaPublishedImage(imageUploadFileNameSections));
    default:
      return E.left(new Error());
  }
};

export const getPublishedImageBlobPath = (
  publishedImage: PublishedImage
): string => {
  const {
    imageProcessType,
    publishServiceType,
    publishedCollectionSetParentName,
    publishedCollectionSetName,
    publishedCollectionName,
    imageName,
  } = publishedImage;

  let blobPath = `${imageProcessType}/${publishServiceType}/`;
  if (publishedCollectionSetParentName) {
    blobPath += `${publishedCollectionSetParentName}/`;
  }
  if (publishedCollectionSetName) {
    blobPath += `${publishedCollectionSetName}/`;
  }
  if (publishedCollectionName) {
    blobPath += `${publishedCollectionName}/`;
  }
  blobPath += imageName;
  return blobPath;
};

export const updatePublishedImageWithImageProcess = (
  publishedImage: PublishedImage,
  imageProcessType: ImageProcessType
): PublishedImage => {
  return {
    ...publishedImage,
    imageProcessType,
  };
};

export const updatePublishedImageWithImageDimension = (
  publishedImage: PublishedImage,
  imageDimensionType: ImageDimensionType
): PublishedImage => {
  return {
    ...publishedImage,
    imageDimensionType,
  };
};
