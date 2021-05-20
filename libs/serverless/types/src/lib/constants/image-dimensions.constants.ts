import {
  LongestEdgeImageDimension,
  StandardImageDimension,
  TileImageDimension,
} from '@dark-rush-photography/serverless/types';

export const IMAGE_DIMENSIONS: (
  | LongestEdgeImageDimension
  | StandardImageDimension
  | TileImageDimension
)[] = [
  {
    type: 'Tile',
    minWidth: 512,
    minHeight: 256,
    longestEdge: 512,
  },
  {
    type: 'Thumbnail',
    longestEdge: 16,
  },
  {
    type: 'Small',
    longestEdge: 512,
  },
  {
    type: 'Medium',
    longestEdge: 1024,
  },
  {
    type: 'Large',
    longestEdge: 2048,
  },
  {
    type: 'ThreeSixtyThumbnail',
    longestEdge: 52,
  },
  {
    type: 'ThreeSixtySmall',
    longestEdge: 780,
  },
  {
    type: 'ThreeSixtyMedium',
    longestEdge: 1560,
  },
  {
    type: 'ThreeSixtyLarge',
    longestEdge: 3120,
  },
  {
    type: 'Facebook',
    width: 1200,
    height: 630,
    exactFit: false,
  },
  {
    type: 'GoogleBusiness',
    width: 1200,
    height: 900,
    exactFit: true,
  },
  {
    type: 'Instagram',
    width: 1080,
    height: 1080,
    exactFit: true,
  },
  {
    type: 'LinkedIn',
    width: 1200,
    height: 627,
    exactFit: true,
  },
  {
    type: 'Twitter',
    width: 1200,
    height: 627,
    exactFit: true,
  },
];
