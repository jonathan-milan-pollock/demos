import { Emotion } from '@dark-rush-photography/shared-types';

export const toEmotion = (emotion: Emotion): Emotion => {
  return {
    id: emotion.id,
    entityId: emotion.entityId,
    commentId: emotion.commentId,
    mediaId: emotion.mediaId,
    type: emotion.type,
    user: emotion.user,
  };
};

export const findPublicEmotions = (
  emotions: Emotion[],
  publicCommentIds: string[],
  publicMediaIds: string[]
): Emotion[] => {
  const entityEmotions = emotions.filter((e) => !e.commentId && !e.mediaId);
  const commentEmotions = emotions.filter(
    (e) => e.commentId && publicCommentIds.includes(e.commentId)
  );
  const mediaEmotions = emotions.filter(
    (e) => e.mediaId && publicMediaIds.includes(e.mediaId)
  );
  return [
    ...entityEmotions.map((e) => toEmotion(e)),
    ...commentEmotions.map((e) => toEmotion(e)),
    ...mediaEmotions.map((e) => toEmotion(e)),
  ];
};
