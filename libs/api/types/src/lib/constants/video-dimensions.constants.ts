import { VideoType } from '@dark-rush-photography/shared-types';
import { VideoDimension } from '../interfaces/video-dimension.interface';

export const VIDEO_DIMENSIONS: VideoDimension[] = [
  {
    type: VideoType.Thumbnail,
  },
  {
    type: VideoType.Small,
  },
  {
    type: VideoType.Medium,
  },
  {
    type: VideoType.Large,
  },
  {
    type: VideoType.Facebook,
  },
  {
    type: VideoType.GoogleBusiness,
  },
  {
    type: VideoType.Instagram,
  },
  {
    type: VideoType.LinkedIn,
  },
];
