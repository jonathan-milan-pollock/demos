import { Comment, Emotion } from '@dark-rush-photography/shared/types';

export const findPublicEmotions = (
  emotions: Emotion[],
  publicImageIds: string[],
  publicCommentIds: string[]
): Emotion[] => {
  const entityEmotions = emotions.filter((e) => !e.imageId && !e.commentId);
  const mediaEmotions = emotions.filter(
    (e) => e.imageId && publicImageIds.includes(e.imageId)
  );
  const commentEmotions = emotions.filter(
    (e) => e.commentId && publicCommentIds.includes(e.commentId)
  );
  return [
    ...entityEmotions.map((e) => loadEmotion(e)),
    ...mediaEmotions.map((e) => loadEmotion(e)),
    ...commentEmotions.map((e) => loadEmotion(e)),
  ];
};

export const findEntityEmotions = (
  emotions: Emotion[],
  entityComments: Comment[]
): Emotion[] => {
  const entityCommentIds = entityComments.map((comment) => comment.id);
  return emotions.filter(
    (emotion) =>
      emotion.imageId === undefined ||
      (emotion.commentId && entityCommentIds.includes(emotion.commentId))
  );
};

export const findMediaEmotions = (
  emotions: Emotion[],
  imageId: string,
  mediaComments: Comment[]
): Emotion[] => {
  const mediaCommentIds = mediaComments.map((comment) => comment.id);
  return emotions.filter(
    (emotion) =>
      emotion.imageId === imageId ||
      (emotion.commentId && mediaCommentIds.includes(emotion.commentId))
  );
};

export const loadEmotion = (emotion: Emotion): Emotion => {
  return {
    id: emotion.id,
    entityId: emotion.entityId,
    imageId: emotion.imageId,
    commentId: emotion.commentId,
    type: emotion.type,
    user: emotion.user,
  };
};
