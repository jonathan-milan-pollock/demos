import { NotFoundException } from '@nestjs/common';

import { EmotionAddDto } from '@dark-rush-photography/shared/types';
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

  if (emotionAdd.mediaId) {
    const imageIds = documentModel.images.map((image) => image.id);
    const videoIds = documentModel.videos.map((video) => video.id);
    if (
      !(
        imageIds.includes(emotionAdd.mediaId) ||
        videoIds.includes(emotionAdd.mediaId)
      )
    )
      throw new NotFoundException('Could not find media for emotion');
  }
  return documentModel;
};
