import { Emotion } from '@dark-rush-photography/shared-types';

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
