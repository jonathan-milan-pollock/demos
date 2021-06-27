import { Injectable, NotFoundException } from '@nestjs/common';

import { Comment, Emotion } from '@dark-rush-photography/shared-types';
import {
  CommentAddDto,
  CommentUpdateDto,
} from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toComment } from '../functions/comment.functions';

@Injectable()
export class CommentProvider {
  toComment = (comment: Comment): Comment => toComment(comment);

  addEntityComment = (
    id: string,
    entityId: string,
    maxOrder: number,
    commentAdd: CommentAddDto,
    comments: Comment[]
  ): Partial<DocumentModel> => ({
    comments: [
      ...comments,
      {
        ...commentAdd,
        id,
        entityId,
        order: maxOrder + 1,
      },
    ],
  });

  addMediaComment = (
    id: string,
    entityId: string,
    mediaId: string,
    maxOrder: number,
    commentAdd: CommentAddDto,
    comments: Comment[]
  ): Partial<DocumentModel> => ({
    comments: [
      ...comments,
      {
        ...commentAdd,
        id,
        entityId,
        mediaId,
        order: maxOrder + 1,
      },
    ],
  });

  updateComment = (
    id: string,
    foundComment: Comment,
    commentUpdate: CommentUpdateDto,
    comments: Comment[]
  ): Partial<DocumentModel> => ({
    comments: [
      ...comments.filter((i) => i.id !== id),
      { ...foundComment, ...commentUpdate },
    ],
  });

  validateFindComment(id: string, comments: Comment[]): Comment {
    const foundComment = comments.find((c) => c.id === id);
    if (!foundComment)
      throw new NotFoundException('Could not find comment by id');

    return foundComment;
  }

  removeComment = (
    id: string,
    comments: Comment[],
    emotions: Emotion[]
  ): Partial<DocumentModel> => ({
    comments: [...comments.filter((c) => c.id !== id)],
    emotions: [...emotions.filter((e) => e.commentId !== id)],
  });
}
