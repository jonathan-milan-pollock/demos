import {
  MediaResolution,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';

export interface VideoResolution {
  readonly type: VideoDimensionType;
  readonly resolution: MediaResolution;
}
