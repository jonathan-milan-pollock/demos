import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { ImageDimensionState } from '../enums/image-dimension-state.enum';

export interface ImageDimension {
  readonly entityId: string;
  readonly imageSlug: string;
  readonly type: ImageDimensionType;
  readonly state: ImageDimensionState;

  // dimension
  readonly width: number;
  readonly height: number;
  readonly pitch?: number;
  readonly yaw?: number;
  readonly hfov?: number;
}
