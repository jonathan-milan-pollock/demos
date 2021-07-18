import { Comment } from '@dark-rush-photography/shared/types';

export const findPublicComments = (
  comments: Comment[],
  publicMediaIds: string[]
): Comment[] => {
  const entityComments = comments.filter((c) => !c.mediaId);
  const mediaComments = comments.filter(
    (c) => c.mediaId && publicMediaIds.includes(c.mediaId)
  );
  return [
    ...entityComments.map((c) => loadComment(c)),
    ...mediaComments.map((c) => loadComment(c)),
  ];
};

export const findEntityComments = (comments: Comment[]): Comment[] =>
  comments.filter((comment) => comment.mediaId === undefined);

export const findMediaComments = (
  comments: Comment[],
  mediaId: string
): Comment[] => comments.filter((comment) => comment.mediaId === mediaId);

export const loadComment = (comment: Comment): Comment => {
  return {
    id: comment.id,
    entityId: comment.entityId,
    mediaId: comment.mediaId,
    order: comment.order,
    user: comment.user,
    text: comment.text,
  };
};
