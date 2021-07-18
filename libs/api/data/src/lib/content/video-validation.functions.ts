import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import {
  MediaState,
  Video,
  VideoDimensionAddDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { getEntityTypeAllowsVideoAdd } from './entity-type-allows-video-add.functions';

export const validateVideoFound = (
  id: string,
  documentModel: DocumentModel
): Video => {
  const foundVideo = documentModel.videos.find((video) => video.id == id);
  if (!foundVideo) throw new NotFoundException('Video was not found');
  return foundVideo;
};

export const validateVideoDocumentModelFound = (
  id: string,
  documentModel: DocumentModel
): DocumentModel => {
  const foundVideo = documentModel.videos.find((video) => video.id == id);
  if (!foundVideo) throw new NotFoundException('Video was not found');
  return documentModel;
};

export const validateVideoPublic = (video: Video): Video => {
  if (video.state !== MediaState.Public) throw new NotFoundException();
  return video;
};

export const validateVideoNotAlreadyExists = (
  fileName: string,
  documentModel: DocumentModel
): DocumentModel => {
  const foundVideo = documentModel.videos.find(
    (video) => video.fileName == fileName
  );
  if (foundVideo)
    throw new ConflictException(
      `Video with file name ${fileName} already exists`
    );
  return documentModel;
};

export const validateVideoNotProcessing = (video: Video): Video => {
  if (video.isProcessing)
    throw new ConflictException(
      'Video cannot be modified as it currently being processed'
    );
  return video;
};

export const validateCanAddVideoToEntity = (
  documentModel: DocumentModel
): DocumentModel => {
  if (!getEntityTypeAllowsVideoAdd(documentModel.type)) {
    throw new BadRequestException(
      `Videos cannot be added to entity type ${documentModel.type}`
    );
  }
  return documentModel;
};

export const validateVideoDataUriExists = (video: Video): Video => {
  if (!video.isUploaded)
    throw new ConflictException('Can only find data uri for uploaded videos');
  return video;
};

export const validateCanUpdateVideo = (video: Video): Video => {
  if (!video.isUploaded)
    throw new ConflictException('Can only update uploaded videos');
  return video;
};

export const validateVideoDateCreated = (video: Video): string => {
  if (!video.dateCreated)
    throw new ConflictException('Date video was created was not found');
  return video.dateCreated;
};

export const validateVideoDimensionNotAlreadyExists = (
  videoId: string,
  videoDimensionAdd: VideoDimensionAddDto,
  documentModel: DocumentModel
): DocumentModel => {
  const videoDimensionType = documentModel.videoDimensions.find(
    (videoDimension) =>
      videoDimension.videoId === videoId &&
      videoDimension.type === videoDimensionAdd.type
  );
  if (videoDimensionType) {
    throw new ConflictException(
      `Video dimension ${videoDimensionAdd.type} already exists`
    );
  }
  return documentModel;
};
