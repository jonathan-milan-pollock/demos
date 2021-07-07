import { Media, VideoDimensionType } from '@dark-rush-photography/shared/types';

export interface ServerlessResizeVideoRequest {
  readonly video: Media;
  readonly videoDimensionType: VideoDimensionType;
}
