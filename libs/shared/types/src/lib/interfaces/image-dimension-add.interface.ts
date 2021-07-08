import { ImageDimensionType } from '../enums/image-dimension-type.enum';
import { MediaDimensionPixels } from './media-dimension-pixels.interface';

export interface ImageDimensionAdd {
  readonly type: ImageDimensionType;
  readonly pixels: MediaDimensionPixels;
}
