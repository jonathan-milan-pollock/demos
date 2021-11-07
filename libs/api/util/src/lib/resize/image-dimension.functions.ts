import { BadRequestException, ConflictException } from '@nestjs/common';

import { from, map, Observable } from 'rxjs';

import sharp = require('sharp');

import {
  Dimension,
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
    dimension: { width: 1200, height: 630 },
    exactFit: false,
  },
  {
    type: ImageDimensionType.Instagram,
    dimension: { width: 1080, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.LinkedIn,
    dimension: { width: 1200, height: 627 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.GoogleBusiness,
    dimension: { width: 1200, height: 900 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.YouTubeThumbnail,
    dimension: { width: 1920, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.YouTube,
    dimension: { width: 1920, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.IPadSmall,
    dimension: { width: 80, height: 80 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.IPadMedium,
    dimension: { width: 200, height: 200 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.IPadLarge,
    dimension: { width: 400, height: 200 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.JsonLd,
    longestEdge: 2048 / 2,
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

export const findDimension$ = (filePath: string): Observable<Dimension> =>
  from(sharp(filePath).metadata()).pipe(
    map(({ width, height }) => {
      if (!width)
        throw new BadRequestException(`Width was not found on ${filePath}`);
      if (!height)
        throw new BadRequestException(`Height was not found on ${filePath}`);
      return { width, height };
    })
  );
