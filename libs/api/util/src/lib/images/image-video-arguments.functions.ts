import { ConflictException } from '@nestjs/common';

import {
  Dimension,
  ImageFilePathEmotion,
  ImageVideoExif,
} from '@dark-rush-photography/shared/types';
import { getExifImageVideoArguments } from '../exif/exif-image-video.functions';

export const getMeltImageVideoArguments = (
  imageVideoFilePath: string,
  imageFilePathEmotions: ImageFilePathEmotion[],
  imageVideoLogoFrameFilePath: string
): string => {
  const profile = 'atsc_1080p_25'; // HD 1080p 25 fps, consumer H.264 compression MPEG-4 container format
  const profileArguments = `-verbose -profile ${profile}`;

  const starredImage = imageFilePathEmotions.find(
    (imageFilePathEmotion) => imageFilePathEmotion.isStarred
  );
  if (!starredImage) {
    throw new ConflictException(
      'Could not find a starred image for image video'
    );
  }
  const starredImageDisplayFrames = 75;
  const starredImageArguments = `"${starredImage.filePath}" out=${starredImageDisplayFrames}`;

  const displayFrames = 90;
  const fadeFrames = 25;
  const lovedImages = imageFilePathEmotions.filter(
    (imageFilePathEmotion) => imageFilePathEmotion.isLoved
  );
  const imageArguments = lovedImages.reduce(
    (imageArguments, lovedImage) =>
      `${imageArguments} "${lovedImage.filePath}" out=${displayFrames} -mix ${fadeFrames} -mixer luma`,
    starredImageArguments
  );

  const logoFrameDisplayFrames = 75;
  const logoFrameArguments = `"${imageVideoLogoFrameFilePath}" out=${logoFrameDisplayFrames} -mix ${fadeFrames} -mixer luma`;

  const dimension1080p: Dimension = { width: 1920, height: 1080 };
  const consumerArguments = `-consumer avformat:"${imageVideoFilePath}" width=${dimension1080p.width} height=${dimension1080p.height} vcodec=libx264`;

  return `${profileArguments} ${imageArguments} ${logoFrameArguments} ${consumerArguments}`;
};

export const getFfmpegExifImageVideoArguments = (
  inputImageVideoFilePath: string,
  imageVideoExif: ImageVideoExif,
  outputImageVideoFilePath: string
): string => {
  const overwriteExistingFileWithoutPrompt = '-y';
  const removeAudio = '-an';

  return `-i "${inputImageVideoFilePath}" ${getExifImageVideoArguments(
    imageVideoExif
  )} ${overwriteExistingFileWithoutPrompt} ${removeAudio} "${outputImageVideoFilePath}"`;
};

export const getFfmpegFrontCoverImageVideoArguments = (
  inputImageVideoFilePath: string,
  starredImageFilePath: string,
  outputImageVideoFilePath: string
): string => {
  const inputArguments = `-i "${inputImageVideoFilePath}" -i "${starredImageFilePath}"`;
  const copyArguments = '-c:a copy -c:v copy';
  const mapArguments = '-map 0:0 -map 1:0';
  const metadataVersionArguments = '-id3v2_version 3';
  const metadataArguments =
    '-metadata:s:v title="Album cover" -metadata:s:v comment="Cover (front)"';

  const overwriteExistingFileWithoutPrompt = '-y';
  return `${inputArguments} ${copyArguments} ${mapArguments} ${metadataVersionArguments} ${metadataArguments} ${overwriteExistingFileWithoutPrompt} "${outputImageVideoFilePath}"`;
};
