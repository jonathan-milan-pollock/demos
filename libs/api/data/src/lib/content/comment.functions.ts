import { NotFoundException } from '@nestjs/common';

import { Comment, CommentAdd } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';

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

export const validateAddComment = (
  commentAdd: CommentAdd,
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
