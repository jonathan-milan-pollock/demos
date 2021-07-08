import { VideoDimensionType } from '@dark-rush-photography/shared/types';
import { VideoDimensionConfig } from '../interfaces/video-dimension-config.interface';

export const THREE_SIXTY_VIDEO_RESOLUTIONS: VideoDimensionConfig[] = [
  {
    type: VideoDimensionType.ThreeSixtyFacebook,
    pixels: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.ThreeSixtyGoogleBusiness,
    pixels: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.ThreeSixtyInstagram,
    pixels: { width: 1080, height: 1080 },
  },
  {
    type: VideoDimensionType.ThreeSixtyLinkedIn,
    pixels: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.ThreeSixtyYouTube,
    pixels: { width: 1280, height: 720 },
  },
];
