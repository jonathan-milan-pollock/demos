import { ImageType } from '../enums/image-type.enum';

export interface ImageDimension {
  readonly imageType: ImageType;
  readonly width?: number;
  readonly height?: number;
  readonly longestEdge?: number;
  readonly resizeToExactDimension?: boolean;
}
