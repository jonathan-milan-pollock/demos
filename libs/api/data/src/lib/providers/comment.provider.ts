import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, max, switchMap, switchMapTo } from 'rxjs/operators';

import {
  Comment,
  CommentAdd,
  CommentUpdate,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { toComment, validateAddComment } from '../content/comment.functions';

@Injectable()
export class CommentProvider {
  add$(
    commentAdd: CommentAdd,
    entityModel: Model<DocumentModel>
  ): Observable<Comment> {
    const id = uuidv4();
    return from(entityModel.findById(commentAdd.entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) =>
        combineLatest([
          of(documentModel),
          from(documentModel.comments).pipe(max((comment) => comment.order)),
        ])
      ),
      switchMap(([documentModel, maxComment]) => {
        const validateDocumentModel = validateAddComment(
          commentAdd,
          documentModel
        );
        return from(
          entityModel.findByIdAndUpdate(commentAdd.entityId, {
            comments: [
              ...validateDocumentModel.comments,
              {
                ...commentAdd,
                id,
                order: maxComment.order + 1,
              },
            ],
          })
        );
      }),
      switchMapTo(this.findOne$(id, commentAdd.entityId, entityModel))
    );
  }

  update$(
    id: string,
    entityId: string,
    commentUpdate: CommentUpdate,
    entityModel: Model<DocumentModel>
  ): Observable<Comment> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) => {
        const foundComment = documentModel.comments.find(
          (comment) => comment.id == id
        );
        if (!foundComment) throw new NotFoundException();

        return from(
          entityModel.findByIdAndUpdate(entityId, {
            comments: [
              ...documentModel.comments.filter((comment) => comment.id !== id),
              { ...foundComment, ...commentUpdate },
            ],
          })
        );
      }),
      switchMapTo(this.findOne$(id, entityId, entityModel))
    );
  }

  findOne$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<Comment> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        const foundComment = documentModel.comments.find(
          (comment) => comment.id == id
        );
        if (!foundComment)
          throw new NotFoundException('Could not find comment');

        return toComment(foundComment);
      })
    );
  }

  remove$(
    id: string,
    entityId: string,
    entityModel: Model<DocumentModel>
  ): Observable<DocumentModel> {
    return from(entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      switchMap((documentModel) =>
        from(
          entityModel.findByIdAndUpdate(entityId, {
            comments: [
              ...documentModel.comments.filter((comment) => comment.id !== id),
            ],
            emotions: [
              ...documentModel.emotions.filter(
                (emotion) => emotion.commentId !== id
              ),
            ],
          })
        )
      ),
      map(validateEntityFound)
    );
  }
}
