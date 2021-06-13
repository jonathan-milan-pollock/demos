import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { ImageDimensionState } from '../enums/image-dimension-state.enum';
import { MediaDimensionPixels } from './media-dimension-pixels.interface';
import { ImageDimensionSettings } from './image-dimension-settings.interface';

export interface ImageDimension {
  readonly entityId: string;
  readonly imageSlug: string;
  readonly type: ImageDimensionType;
  readonly state: ImageDimensionState;
  readonly pixels: MediaDimensionPixels;
  readonly settings: ImageDimensionSettings;
}
