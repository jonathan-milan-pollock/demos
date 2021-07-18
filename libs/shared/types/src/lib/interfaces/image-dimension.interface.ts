import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { MediaResolution } from './media-resolution.interface';
import { ThreeSixtySettings } from './three-sixty-settings.interface';

export interface ImageDimension {
  readonly id: string;
  readonly entityId: string;
  readonly imageId: string;
  readonly type: ImageDimensionType;
  readonly resolution: MediaResolution;
  readonly threeSixtySettings?: ThreeSixtySettings;
}
