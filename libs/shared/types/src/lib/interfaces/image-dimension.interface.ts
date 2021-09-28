import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { Resolution } from './resolution.interface';
import { ThreeSixtySettings } from './three-sixty-settings.interface';

export interface ImageDimension {
  readonly id: string;
  readonly entityId: string;
  readonly imageId: string;
  readonly type: ImageDimensionType;
  readonly resolution: Resolution;
  readonly threeSixtySettings: ThreeSixtySettings;
}
