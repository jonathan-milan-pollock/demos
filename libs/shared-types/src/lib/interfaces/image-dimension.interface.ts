import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { ImageProcessState } from '../enums/image-process-state.enum';

export interface ImageDimension {
  readonly type: ImageDimensionType;
  readonly state: ImageProcessState;

  // dimension
  readonly width: number;
  readonly height: number;
  readonly pitch?: number;
  readonly yaw?: number;
  readonly hfov?: number;
}
