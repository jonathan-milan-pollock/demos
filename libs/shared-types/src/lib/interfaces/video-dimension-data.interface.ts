import { VideoDimensionType } from '../enums/video-dimension-type.enum';

export interface VideoDimensionData {
  readonly type: VideoDimensionType;
  readonly entityId: string;
  readonly videoSlug: string;
  readonly dataUri: string;
}
