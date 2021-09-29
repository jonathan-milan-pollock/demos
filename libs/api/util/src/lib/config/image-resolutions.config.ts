import { NotFoundException } from '@nestjs/common';

import {
  ImageDimensionType,
  ImageDimensionConfig,
  ImageDimensionLongestEdgeConfig,
  ImageDimensionStandardConfig,
} from '@dark-rush-photography/shared/types';

export const findImageResolution = (
  imageDimensionType: ImageDimensionType
): ImageDimensionConfig => {
  const imageResolution = IMAGE_RESOLUTIONS.find(
    (imageResolution) => imageResolution.type === imageDimensionType
  );
  if (!imageResolution)
    throw new NotFoundException(
      `Image resolution is not found for type ${imageDimensionType}`
    );
  return imageResolution;
};

export const IMAGE_RESOLUTIONS: (
  | ImageDimensionStandardConfig
  | ImageDimensionLongestEdgeConfig
)[] = [
  {
    type: ImageDimensionType.Thumbnail,
    longestEdge: 16,
  },
  {
    type: ImageDimensionType.Small,
    longestEdge: 512,
  },
  {
    type: ImageDimensionType.Medium,
    longestEdge: 1024,
  },
  {
    type: ImageDimensionType.Large,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.Facebook,
    resolution: { width: 1200, height: 630 },
    exactFit: false,
  },
  {
    type: ImageDimensionType.Instagram,
    resolution: { width: 1080, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.LinkedIn,
    resolution: { width: 1200, height: 627 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.GoogleBusiness,
    resolution: { width: 1080, height: 608 },
    exactFit: true,
  },
];
