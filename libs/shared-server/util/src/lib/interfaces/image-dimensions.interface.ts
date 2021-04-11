import { ImageType } from '@dark-rush-photography/shared/util';

export interface ImageDimension {
  readonly imageType: ImageType;
  readonly width?: number;
  readonly height?: number;
  readonly longestEdge?: number;
  readonly resizeToExactDimension?: boolean;
}
