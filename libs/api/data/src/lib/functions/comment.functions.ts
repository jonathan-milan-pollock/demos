import { Comment } from '@dark-rush-photography/shared-types';

export const toComment = (comment: Comment): Comment => {
  return {
    id: comment.id,
    entityId: comment.entityId,
    mediaId: comment.mediaId,
    order: comment.order,
    user: comment.user,
    text: comment.text,
  };
};

export const findPublicComments = (
  comments: Comment[],
  publicMediaIds: string[]
): Comment[] => {
  const entityComments = comments.filter((c) => !c.mediaId);
  const mediaComments = comments.filter(
    (c) => c.mediaId && publicMediaIds.includes(c.mediaId)
  );
  return [
    ...entityComments.map((c) => toComment(c)),
    ...mediaComments.map((c) => toComment(c)),
  ];
};
