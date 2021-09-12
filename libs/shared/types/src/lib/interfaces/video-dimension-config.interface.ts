import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { MediaResolution } from './media-resolution.interface';

export interface VideoResolution {
  readonly type: VideoDimensionType;
  readonly resolution: MediaResolution;
}
