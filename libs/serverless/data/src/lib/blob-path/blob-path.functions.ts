import { ImageDimensionType } from '@dark-rush-photography/shared-types';
import {
  ImageProcessType,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';

export const getBlobPath = (
  imageProcessType: ImageProcessType,
  publishedImage: PublishedImage
): string => {
  const {
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

export const getBlobPathWithImageDimension = (
  imageProcessType: ImageProcessType,
  publishedImage: PublishedImage,
  imageDimensionType: ImageDimensionType
): string => {
  const {
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
  blobPath += `${imageDimensionType.toLowerCase()}/`;
  blobPath += imageName;
  return blobPath;
};
