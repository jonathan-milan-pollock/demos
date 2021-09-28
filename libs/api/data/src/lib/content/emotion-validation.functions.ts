import { NotFoundException } from '@nestjs/common';

import { EmotionAddDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';

export const validateAddEmotion = (
  emotionAdd: EmotionAddDto,
  documentModel: DocumentModel
): DocumentModel => {
  if (emotionAdd.commentId) {
    const commentIds = documentModel.comments.map((comment) => comment.id);
    if (!commentIds.includes(emotionAdd.commentId))
      throw new NotFoundException('Could not find comment for emotion');
  }

  if (emotionAdd.imageId) {
    const imageIds = documentModel.images.map((image) => image.id);
    const videoIds = documentModel.videos.map((video) => video.id);
    if (
      !(
        imageIds.includes(emotionAdd.imageId) ||
        videoIds.includes(emotionAdd.imageId)
      )
    )
      throw new NotFoundException('Could not find media for emotion');
  }
  return documentModel;
};
