import { NotFoundException } from '@nestjs/common';

import { VideoDimensionType } from '@dark-rush-photography/shared/types';
import { VideoResolution } from '@dark-rush-photography/api/types';

export const GET_THREE_SIXTY_VIDEO_RESOLUTION = (
  videoDimensionType: VideoDimensionType
): VideoResolution => {
  const threeSixtyVideoResolution = THREE_SIXTY_VIDEO_RESOLUTIONS.find(
    (videoResolution) => videoResolution.type === videoDimensionType
  );
  if (!threeSixtyVideoResolution)
    throw new NotFoundException(
      `Three sixty video resolution is not found for type ${videoDimensionType}`
    );
  return threeSixtyVideoResolution;
};

export const THREE_SIXTY_VIDEO_RESOLUTIONS: VideoResolution[] = [
  {
    type: VideoDimensionType.ThreeSixtyFacebook,
    resolution: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.ThreeSixtyGoogleBusiness,
    resolution: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.ThreeSixtyInstagram,
    resolution: { width: 1080, height: 1080 },
  },
  {
    type: VideoDimensionType.ThreeSixtyLinkedIn,
    resolution: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.ThreeSixtyYouTube,
    resolution: { width: 1280, height: 720 },
  },
];
