import { VideoDimensionType } from '@dark-rush-photography/shared/types';
import { VideoDimensionConfig } from '../interfaces/video-dimension-config.interface';

export const VIDEO_RESOLUTIONS: VideoDimensionConfig[] = [
  {
    type: VideoDimensionType.Facebook,
    pixels: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.GoogleBusiness,
    pixels: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.Instagram,
    pixels: { width: 1080, height: 1080 },
  },
  {
    type: VideoDimensionType.LinkedIn,
    pixels: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.YouTube,
    pixels: { width: 1280, height: 720 },
  },
];
