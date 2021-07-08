import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { MediaDimensionPixels } from './media-dimension-pixels.interface';
import { ThreeSixtyImageSettings } from './three-sixty-image-settings.interface';

export interface ImageDimension {
  readonly id: string;
  readonly entityId: string;
  readonly imageId: string;
  readonly type: ImageDimensionType;
  readonly pixels: MediaDimensionPixels;
  readonly threeSixtyImageSettings: ThreeSixtyImageSettings;
}
