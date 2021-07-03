import { Logger } from '@nestjs/common';
import {
  Image,
  MediaDimensionPixels,
} from '@dark-rush-photography/shared/types';

export const meltVideo = (
  images: Image[],
  videoFilePath: string,
  mediaDimensions: MediaDimensionPixels
): string => {
  const firstImageDisplayFrames = 50;
  const imageDisplayFrames = 75;
  const fadeFrames = 25;
  const profile = 'atsc_720p_25'; // HD 720p 25 fps, consumer H.264 or MPEG-4"

  let isFirstFrame = true;
  let imageProperties = '';
  for (const image of images) {
    if (isFirstFrame) {
      imageProperties += `"${image.fileName}" out=${firstImageDisplayFrames}`;
      isFirstFrame = false;
    }
    imageProperties += ` "${image.fileName}" out=${imageDisplayFrames} -mix ${fadeFrames} -mixer luma`;
  }
  const command = `-verbose -profile ${profile} ${imageProperties} -consumer avformat:${videoFilePath} width=${mediaDimensions.width} height=${mediaDimensions.height} vcodec=libx264"`;
  Logger.log(command, meltVideo.name);
  return command;
};
