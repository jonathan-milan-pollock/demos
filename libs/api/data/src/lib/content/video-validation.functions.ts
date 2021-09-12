import { NotFoundException } from '@nestjs/common';

import { Video } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const validateVideoFound = (
  id: string,
  documentModel: DocumentModel
): Video => {
  const foundVideo = documentModel.videos.find((video) => video.id === id);
  if (!foundVideo) throw new NotFoundException('Video was not found');
  return foundVideo;
};
