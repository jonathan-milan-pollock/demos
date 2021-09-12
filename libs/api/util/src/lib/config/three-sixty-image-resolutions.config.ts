import { NotFoundException } from '@nestjs/common';

import {
  ImageDimensionType,
  ImageDimensionConfig,
  ImageDimensionLongestEdgeConfig,
  ImageDimensionStandardConfig,
  ImageDimensionTileConfig,
} from '@dark-rush-photography/shared/types';

export const findThreeSixtyImageResolution = (
  imageDimensionType: ImageDimensionType
): ImageDimensionConfig => {
  const threeSixtyImageResolution = THREE_SIXTY_IMAGE_RESOLUTIONS.find(
    (imageResolution) => imageResolution.type === imageDimensionType
  );
  if (!threeSixtyImageResolution)
    throw new NotFoundException(
      `Three sixty image resolution is not found for type ${imageDimensionType}`
    );
  return threeSixtyImageResolution;
};

export const THREE_SIXTY_IMAGE_RESOLUTIONS: (
  | ImageDimensionStandardConfig
  | ImageDimensionLongestEdgeConfig
  | ImageDimensionTileConfig
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
