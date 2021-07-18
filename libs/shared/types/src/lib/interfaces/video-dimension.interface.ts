import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { MediaResolution } from './media-resolution.interface';

export interface VideoDimension {
  readonly id: string;
  readonly entityId: string;
  readonly videoId: string;
  readonly type: VideoDimensionType;
  readonly resolution: MediaResolution;
}
