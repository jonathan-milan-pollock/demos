import { Logger } from '@nestjs/common';
import { Image, MediaResolution } from '@dark-rush-photography/shared/types';

// TODO: exif the video
// TODO: resize the video for social media
// TODO: copy the files to azure blob storage
// TODO:
export const createImageVideo = (): boolean => {
  return true;
};
//var meltVideo = Path.Combine(publishingDirectory, $"{videoName}-melt.mp4");
//var fFmpegVideo = Path.Combine(publishingDirectory, $"{videoName}-FFmpeg.mp4");
//var video = Path.Combine(publishingDirectory, $"{videoName}.mp4");

export const meltVideo = (
  images: Image[],
  videoFilePath: string,
  pixels: MediaResolution
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
  const command = `-verbose -profile ${profile} ${imageProperties} -consumer avformat:${videoFilePath} width=${pixels.width} height=${pixels.height} vcodec=libx264"`;
  Logger.log(command, meltVideo.name);
  return command;
};
