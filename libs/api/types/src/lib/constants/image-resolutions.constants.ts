import { BadRequestException } from '@nestjs/common';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { StandardImageResolution } from '../interfaces/standard-image-resolution.interface';
import { LongestEdgeImageResolution } from '../interfaces/longest-edge-image-resolution.interface';
import { TileImageResolution } from '../interfaces/tile-image-resolution.interface';
import { ImageResolution } from '../interfaces/image-resolution.interface';

export const findImageResolution = (
  imageDimensionType: ImageDimensionType
): ImageResolution => {
  const imageResolution = IMAGE_RESOLUTIONS.find(
    (imageResolution) => imageResolution.type === imageDimensionType
  );
  if (!imageResolution)
    throw new BadRequestException(
      `Could not find image resolution for type ${imageDimensionType}`
    );
  return imageResolution;
};

//TODO: Move these to env
export const IMAGE_RESOLUTIONS: (
  | StandardImageResolution
  | LongestEdgeImageResolution
  | TileImageResolution
)[] = [
  {
    type: ImageDimensionType.Tile,
    minPixels: { width: 260, height: 186 },
    longestEdge: 260,
  },
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
    pixels: { width: 1200, height: 630 },
    exactFit: false,
  },
  {
    type: ImageDimensionType.Instagram,
    pixels: { width: 1080, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.LinkedIn,
    pixels: { width: 1200, height: 627 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.GoogleBusiness,
    pixels: { width: 1080, height: 608 },
    exactFit: true,
  },
];
