import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { MediaDimensionPixels } from './media-dimension-pixels.interface';

export interface VideoDimensionAdd {
  readonly type: VideoDimensionType;
  readonly pixels: MediaDimensionPixels;
}
