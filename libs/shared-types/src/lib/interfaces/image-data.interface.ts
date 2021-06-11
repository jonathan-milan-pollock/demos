import { ImageDimensionType } from '../enums/image-dimension-type.enum';

export interface ImageData {
  readonly slug: string;
  readonly dimensionType: ImageDimensionType;
  readonly dataUri: string;
}
