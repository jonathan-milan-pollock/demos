import { VideoDimensionType } from '../enums/video-dimension-type.enum';
import { Resolution } from './resolution.interface';

export interface VideoDimension {
  readonly id: string;
  readonly entityId: string;
  readonly videoId: string;
  readonly type: VideoDimensionType;
  readonly resolution: Resolution;
}
