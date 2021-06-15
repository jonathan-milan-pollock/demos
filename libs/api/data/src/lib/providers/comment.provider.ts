import { Injectable } from '@nestjs/common';

import { Comment } from '@dark-rush-photography/shared-types';

@Injectable()
export class CommentProvider {
  toComment(comment: Comment): Comment {
    return {
      entityId: comment.entityId,
      mediaSlug: comment.mediaSlug,
      id: comment.id,
      order: comment.order,
      user: comment.user,
      text: comment.text,
    };
  }
}
