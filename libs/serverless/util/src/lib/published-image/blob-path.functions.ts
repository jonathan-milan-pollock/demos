import {
  ImageDimensionType,
  ImageProcessState,
} from '@dark-rush-photography/shared-types';
import { PublishedImage } from '@dark-rush-photography/serverless/types';

export const getBlobPath = (
  imageProcessState: ImageProcessState,
  publishedImage: PublishedImage
): string => {
  const {
    publishServiceType,
    publishedCollectionSetParentName,
    publishedCollectionSetName,
    publishedCollectionName,
    imageName,
  } = publishedImage;

  let blobPath = `${imageProcessState}/${publishServiceType}/`;
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
  imageProcessState: ImageProcessState,
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

  let blobPath = `${imageProcessState}/${publishServiceType}/`;
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
