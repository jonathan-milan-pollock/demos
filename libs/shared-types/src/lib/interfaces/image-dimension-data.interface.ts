import { ImageDimensionType } from '../enums/image-dimension-type.enum';

export interface ImageDimensionData {
  readonly type: ImageDimensionType;
  readonly entityId: string;
  readonly slug: string;
  readonly dataUri: string;
}
