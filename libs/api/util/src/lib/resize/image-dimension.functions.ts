import { ConflictException } from '@nestjs/common';

import {
  ImageDimension,
  ImageDimensionLongestEdge,
  ImageDimensionStandard,
  ImageDimensionType,
} from '@dark-rush-photography/shared/types';

export const getImageDimensions = (): (
  | ImageDimensionStandard
  | ImageDimensionLongestEdge
)[] => [
  {
    type: ImageDimensionType.Thumbnail,
    longestEdge: 2048 / 128,
  },
  {
    type: ImageDimensionType.Small,
    longestEdge: 2048 / 4,
  },
  {
    type: ImageDimensionType.Medium,
    longestEdge: 2048 / 2,
  },
  {
    type: ImageDimensionType.Large,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.StarredThumbnail,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.StarredSmall,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.StarredMedium,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.StarredLarge,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationThumbnail,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationSmall,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationMedium,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationLarge,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationStarredThumbnail,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationStarredSmall,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationStarredMedium,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.DestinationStarredLarge,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.ReviewThumbnail,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.ReviewSmall,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.ReviewMedium,
    longestEdge: 2048,
  },
  {
    type: ImageDimensionType.ReviewLarge,
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
    resolution: { width: 1200, height: 900 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.YouTubeThumbnail,
    resolution: { width: 1920, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.YouTube,
    resolution: { width: 1920, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.IPadSmall,
    resolution: { width: 80, height: 80 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.IPadMedium,
    resolution: { width: 200, height: 200 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.IPadLarge,
    resolution: { width: 400, height: 200 },
    exactFit: true,
  },
];

export const getImageDimension = (
  imageDimensionType: ImageDimensionType
): ImageDimension => {
  const imageDimensions = getImageDimensions();
  const imageDimension = imageDimensions.find(
    (imageDimension) => imageDimension.type === imageDimensionType
  );
  if (!imageDimension)
    throw new ConflictException(
      `Could not get image dimension for type ${imageDimensionType}`
    );
  return imageDimension;
};
