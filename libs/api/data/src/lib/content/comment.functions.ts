import { Comment } from '@dark-rush-photography/shared/types';

export const findPublicComments = (
  comments: Comment[],
  publicImageIds: string[]
): Comment[] => {
  const entityComments = comments.filter((c) => !c.imageId);
  const mediaComments = comments.filter(
    (c) => c.imageId && publicImageIds.includes(c.imageId)
  );
  return [
    ...entityComments.map((c) => loadComment(c)),
    ...mediaComments.map((c) => loadComment(c)),
  ];
};

export const findEntityComments = (comments: Comment[]): Comment[] =>
  comments.filter((comment) => comment.imageId === undefined);

export const findMediaComments = (
  comments: Comment[],
  imageId: string
): Comment[] => comments.filter((comment) => comment.imageId === imageId);

export const loadComment = (comment: Comment): Comment => {
  return {
    id: comment.id,
    entityId: comment.entityId,
    imageId: comment.imageId,
    order: comment.order,
    user: comment.user,
    text: comment.text,
  };
};
