import {
  MediaDimensionPixels,
  VideoDimensionType,
} from '@dark-rush-photography/shared/types';

export interface VideoDimensionConfig {
  readonly type: VideoDimensionType;
  readonly pixels: MediaDimensionPixels;
}
