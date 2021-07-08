import { BadRequestException } from '@nestjs/common';

import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { StandardImageResolution } from '../interfaces/standard-image-resolution.interface';
import { LongestEdgeImageResolution } from '../interfaces/longest-edge-image-resolution.interface';
import { TileImageResolution } from '../interfaces/tile-image-resolution.interface';
import { ImageResolution } from '../interfaces/image-resolution.interface';

export const findThreeSixtyImageResolution = (
  imageDimensionType: ImageDimensionType
): ImageResolution => {
  const threeSixtyImageResolution = THREE_SIXTY_IMAGE_RESOLUTIONS.find(
    (imageResolution) => imageResolution.type === imageDimensionType
  );
  if (!threeSixtyImageResolution)
    throw new BadRequestException(
      `Could not find three sixty image resolution for type ${imageDimensionType}`
    );
  return threeSixtyImageResolution;
};

export const THREE_SIXTY_IMAGE_RESOLUTIONS: (
  | StandardImageResolution
  | LongestEdgeImageResolution
  | TileImageResolution
)[] = [
  {
    type: ImageDimensionType.ThreeSixtyTile,
    minPixels: { width: 260, height: 186 },
    longestEdge: 260,
  },
  {
    type: ImageDimensionType.ThreeSixtyThumbnail,
    longestEdge: 52,
  },
  {
    type: ImageDimensionType.ThreeSixtySmall,
    longestEdge: 780,
  },
  {
    type: ImageDimensionType.ThreeSixtyMedium,
    longestEdge: 1560,
  },
  {
    type: ImageDimensionType.ThreeSixtyLarge,
    longestEdge: 3120,
  },
  {
    type: ImageDimensionType.ThreeSixtyFacebook,
    pixels: { width: 5120, height: 2560 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.ThreeSixtyInstagram,
    pixels: { width: 1080, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.ThreeSixtyLinkedIn,
    pixels: { width: 1280, height: 720 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.ThreeSixtyGoogleBusiness,
    pixels: { width: 4096, height: 2048 },
    exactFit: true,
  },
];
