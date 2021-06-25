import { ImageDimensionType } from '../enums/image-dimension-type.enum';

export interface ImageDimensionData {
  readonly type: ImageDimensionType;
  readonly entityId: string;
  readonly imageId: string;
  readonly dataUri: string;
}
