import { NotFoundException } from '@nestjs/common';

import {
  ImageDimensionType,
  ImageDimensionConfig,
  ImageDimensionLongestEdgeConfig,
  ImageDimensionStandardConfig,
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
)[] = [
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
    resolution: { width: 5120, height: 2560 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.ThreeSixtyInstagram,
    resolution: { width: 1080, height: 1080 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.ThreeSixtyLinkedIn,
    resolution: { width: 1280, height: 720 },
    exactFit: true,
  },
  {
    type: ImageDimensionType.ThreeSixtyGoogleBusiness,
    resolution: { width: 4096, height: 2048 },
    exactFit: true,
  },
];
