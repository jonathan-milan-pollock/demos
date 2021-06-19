import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, max, switchMap } from 'rxjs/operators';

import { Comment } from '@dark-rush-photography/shared-types';
import { CommentAddDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toComment } from '../functions/comment.functions';

@Injectable()
export class CommentProvider {
  findById$(
    entityModel: Model<DocumentModel>,
    entityId: string,
    id: string
  ): Observable<Comment> {
    return from(entityModel.findById(entityId).exec()).pipe(
      map((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity for comment');

        const foundComment = response.comments.find((i) => i.id === id);
        if (!foundComment)
          throw new NotFoundException('Could not find comment by id');

        return toComment(foundComment);
      })
    );
  }

  add$(
    response: DocumentModel,
    entityModel: Model<DocumentModel>,
    id: string,
    entityId: string,
    comment: CommentAddDto,
    mediaId?: string
  ): Observable<DocumentModel | null> {
    return combineLatest([
      of(response),
      from(response.comments).pipe(max((comment) => comment.order)),
    ]).pipe(
      switchMap(([response, maxComment]) => {
        return from(
          entityModel.findByIdAndUpdate(entityId, {
            comments: [
              ...response.comments,
              {
                ...comment,
                id,
                entityId,
                mediaId,
                order: maxComment.order + 1,
              },
            ],
          })
        );
      })
    );
  }
}
