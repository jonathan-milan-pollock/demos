import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { ImageDimensionState } from '../enums/image-dimension-state.enum';
import { ImageDimensionPixels } from './image-dimension-pixels.interface';
import { ThreeSixtyImageSettings } from './three-sixty-image-settings.interface';

export interface ImageDimension {
  readonly entityId: string;
  readonly imageSlug: string;
  readonly type: ImageDimensionType;
  readonly state: ImageDimensionState;
  readonly imageDimensionPixels: ImageDimensionPixels;
  readonly threeSixtyImageSettings?: ThreeSixtyImageSettings;
}
