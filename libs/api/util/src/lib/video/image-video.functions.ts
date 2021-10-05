import { Logger } from '@nestjs/common';
import { Image, Resolution } from '@dark-rush-photography/shared/types';

// TODO: exif the video
// TODO: copy the files to azure blob storage
// TODO:
export const createImageVideo = (): boolean => {
  return true;
};
//var meltVideo = Path.Combine(publishingDirectory, $"{videoName}-melt.mp4");
//var fFmpegVideo = Path.Combine(publishingDirectory, $"{videoName}-FFmpeg.mp4");
//var video = Path.Combine(publishingDirectory, $"{videoName}.mp4");

export const meltVideo = (images: Image[], videoFilePath: string): string => {
  const resolution1080p: Resolution = { width: 1920, height: 1080 };
  const firstImageDisplayFrames = 50;
  const imageDisplayFrames = 75;
  const fadeFrames = 25;
  const profile = 'atsc_1080p_25'; // HD 1080p 25 fps, consumer H.264 compression MPEG-4 container format

  let isFirstFrame = true;
  let imageProperties = '';
  for (const image of images) {
    if (isFirstFrame) {
      imageProperties += `"${image.fileName}" out=${firstImageDisplayFrames}`;
      isFirstFrame = false;
    }
    imageProperties += ` "${image.fileName}" out=${imageDisplayFrames} -mix ${fadeFrames} -mixer luma`;
  }
  const command = `-verbose -profile ${profile} ${imageProperties} -consumer avformat:${videoFilePath} width=${resolution1080p.width} height=${resolution1080p.height} vcodec=libx264"`;
  Logger.log(command, meltVideo.name);
  return command;
};
