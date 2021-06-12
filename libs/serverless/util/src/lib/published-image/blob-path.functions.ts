import {
  ImageDimensionState,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { PublishedImage } from '@dark-rush-photography/serverless/types';

export const getBlobPrefix = (
  imageDimensionState: ImageDimensionState,
  publishedImage: PublishedImage
): string => {
  const { publishServiceType, group, slug } = publishedImage;

  let blobPrefix = `${imageDimensionState}/${publishServiceType}/`;
  if (group) {
    blobPrefix += `${group}/`;
  }
  return `${blobPrefix}${slug}`;
};

export const getBlobPath = (
  imageDimensionState: ImageDimensionState,
  publishedImage: PublishedImage
): string => {
  const { imageName } = publishedImage;

  const blobPrefix = getBlobPrefix(imageDimensionState, publishedImage);
  return `${blobPrefix}/${imageName}`;
};

export const getBlobPathWithImageDimension = (
  imageDimensionState: ImageDimensionState,
  publishedImage: PublishedImage,
  imageDimensionType: ImageDimensionType
): string => {
  const { imageName } = publishedImage;

  const blobPrefix = getBlobPrefix(imageDimensionState, publishedImage);
  return `${blobPrefix}/${imageDimensionType.toLowerCase()}/${imageName}`;
};
