import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { Resolution } from './resolution.interface';

export interface VideoResolution {
  readonly type: VideoDimensionType;
  readonly resolution: Resolution;
}
