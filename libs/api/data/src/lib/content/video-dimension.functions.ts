import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import {
  VideoDimension,
  VideoDimensionAdd,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const toVideoDimension = (
  videoDimension: VideoDimension
): VideoDimension => {
  return {
    id: videoDimension.id,
    entityId: videoDimension.entityId,
    videoId: videoDimension.videoId,
    type: videoDimension.type,
    pixels: videoDimension.pixels,
  };
};

export const findPublicVideoDimensions = (
  videoDimensions: VideoDimension[],
  publicVideoIds: string[]
): VideoDimension[] => {
  return videoDimensions
    .filter((vd) => publicVideoIds.includes(vd.videoId))
    .map((vd) => toVideoDimension(vd));
};

export const validateAddVideoDimension = (
  videoId: string,
  videoDimensionAdd: VideoDimensionAdd,
  documentModel: DocumentModel
): DocumentModel => {
  const videoIds = documentModel.videos.map((video) => video.id);
  if (!videoIds.includes(videoId)) {
    throw new NotFoundException('Could not find video for dimension');
  }
  const videoDimensionType = documentModel.videoDimensions.find(
    (videoDimension) => videoDimension.type === videoDimensionAdd.type
  );
  if (videoDimensionType) {
    throw new ConflictException(
      `Video dimension type ${videoDimensionAdd.type} already exists`,
      HttpStatus.FOUND
    );
  }
  return documentModel;
};
