import { NotFoundException } from '@nestjs/common';

import { CommentAddDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';

export const validateAddComment = (
  commentAdd: CommentAddDto,
  documentModel: DocumentModel
): DocumentModel => {
  if (commentAdd.mediaId) {
    const imageIds = documentModel.images.map((image) => image.id);
    const videoIds = documentModel.videos.map((video) => video.id);
    if (
      !(
        imageIds.includes(commentAdd.mediaId) ||
        videoIds.includes(commentAdd.mediaId)
      )
    )
      throw new NotFoundException('Could not find media for comment');
  }
  return documentModel;
};
