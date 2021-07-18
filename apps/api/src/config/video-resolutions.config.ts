import { VideoResolution } from '@dark-rush-photography/api/types';
import { VideoDimensionType } from '@dark-rush-photography/shared/types';
import { BadRequestException } from '@nestjs/common';

export const findVideoResolution = (
  videoDimensionType: VideoDimensionType
): VideoResolution => {
  const videoResolution = VIDEO_RESOLUTIONS.find(
    (videoResolution) => videoResolution.type === videoDimensionType
  );
  if (!videoResolution)
    throw new BadRequestException(
      `Video resolution is not found for type ${videoDimensionType}`
    );
  return videoResolution;
};

export const VIDEO_RESOLUTIONS: VideoResolution[] = [
  {
    type: VideoDimensionType.Facebook,
    resolution: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.GoogleBusiness,
    resolution: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.Instagram,
    resolution: { width: 1080, height: 1080 },
  },
  {
    type: VideoDimensionType.LinkedIn,
    resolution: { width: 1280, height: 720 },
  },
  {
    type: VideoDimensionType.YouTube,
    resolution: { width: 1280, height: 720 },
  },
];
