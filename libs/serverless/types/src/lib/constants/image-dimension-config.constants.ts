import { ImageDimensionType } from '@dark-rush-photography/shared/types';
import { ImageDimensionStandardConfig } from '../interfaces/image-dimension-standard-config.interface';
import { ImageDimensionLongestEdgeConfig } from '../interfaces/image-dimension-longest-edge-config.interface';
import { ImageDimensionTileConfig } from '../interfaces/image-dimension-tile-config.interface';

export const IMAGE_DIMENSION_CONFIG: (
  | ImageDimensionStandardConfig
  | ImageDimensionLongestEdgeConfig
  | ImageDimensionTileConfig
)[] = [
  {
    type: ImageDimensionType.Tile,
    minWidth: 260,
    minHeight: 186,
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
    width: 1200,
    height: 630,
    exactFit: false,
  },
  {
    type: ImageDimensionType.Instagram,
    width: 1080,
    height: 1080,
    exactFit: true,
  },
  {
    type: ImageDimensionType.LinkedIn,
    width: 1200,
    height: 627,
    exactFit: true,
  },
  {
    type: ImageDimensionType.GoogleBusiness,
    width: 1200,
    height: 900,
    exactFit: true,
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
    longestEdge: 3120,
  },
  {
    type: ImageDimensionType.ThreeSixtyInstagram,
    longestEdge: 3120,
  },
  {
    type: ImageDimensionType.ThreeSixtyLinkedIn,
    longestEdge: 3120,
  },
  {
    type: ImageDimensionType.ThreeSixtyGoogleBusiness,
    longestEdge: 3120,
  },
];
