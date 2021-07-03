import { NotFoundException } from '@nestjs/common';

import { Emotion, EmotionAdd } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

export const toEmotion = (emotion: Emotion): Emotion => {
  return {
    id: emotion.id,
    entityId: emotion.entityId,
    mediaId: emotion.mediaId,
    commentId: emotion.commentId,
    type: emotion.type,
    user: emotion.user,
  };
};

export const findPublicEmotions = (
  emotions: Emotion[],
  publicMediaIds: string[],
  publicCommentIds: string[]
): Emotion[] => {
  const entityEmotions = emotions.filter((e) => !e.mediaId && !e.commentId);
  const mediaEmotions = emotions.filter(
    (e) => e.mediaId && publicMediaIds.includes(e.mediaId)
  );
  const commentEmotions = emotions.filter(
    (e) => e.commentId && publicCommentIds.includes(e.commentId)
  );
  return [
    ...entityEmotions.map((e) => toEmotion(e)),
    ...mediaEmotions.map((e) => toEmotion(e)),
    ...commentEmotions.map((e) => toEmotion(e)),
  ];
};

export const validateAddEmotion = (
  emotionAdd: EmotionAdd,
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
