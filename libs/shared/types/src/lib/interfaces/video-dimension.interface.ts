import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { MediaDimensionPixels } from './media-dimension-pixels.interface';

export interface VideoDimension {
  readonly id: string;
  readonly entityId: string;
  readonly videoId: string;
  readonly type: VideoDimensionType;
  readonly pixels: MediaDimensionPixels;
}
