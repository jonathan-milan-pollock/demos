import {
  ImageDimensionType,
  ImageProcessActivityType,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';

export const getBlobPath = (
  imageProcessActivityType: ImageProcessActivityType,
  publishedImage: PublishedImage
): string => {
  const {
    publishServiceType,
    publishedCollectionSetParentName,
    publishedCollectionSetName,
    publishedCollectionName,
    imageName,
  } = publishedImage;

  let blobPath = `${imageProcessActivityType}/${publishServiceType}/`;
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
  imageProcessActivityType: ImageProcessActivityType,
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

  let blobPath = `${imageProcessActivityType}/${publishServiceType}/`;
  if (publishedCollectionSetParentName) {
    blobPath += `${publishedCollectionSetParentName}/`;
  }
  if (publishedCollectionSetName) {
    blobPath += `${publishedCollectionSetName}/`;
  }
  if (publishedCollectionName) {
    blobPath += `${publishedCollectionName}/`;
  }
  blobPath += `${imageDimensionType}/`;
  blobPath += imageName;
  return blobPath;
};
