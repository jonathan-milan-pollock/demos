import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, max, switchMap, switchMapTo } from 'rxjs/operators';

import {
  Comment,
  CommentAdd,
  CommentUpdate,
  ContentType,
} from '@dark-rush-photography/shared/types';
import {
  ContentProvider,
  Document,
  DocumentModel,
} from '@dark-rush-photography/api/data';

@Injectable()
export class UserCommentsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentProvider: ContentProvider
  ) {}

  add$(commentAdd: CommentAdd): Observable<Comment> {
    const id = uuidv4();
    return from(this.entityModel.findById(commentAdd.entityId)).pipe(
      map(this.contentProvider.validateEntityFound),
      switchMap((documentModel) =>
        from(documentModel.comments).pipe(max((comment) => comment.order))
      ),
      switchMap((maxComment) =>
        this.contentProvider.add$(
          ContentType.Comment,
          commentAdd.entityId,
          this.entityModel,
          () => false,
          (documentModel) => {
            const validateDocumentModel = this.contentProvider.validateAddComment(
              commentAdd,
              documentModel
            );
            return {
              comments: [
                ...validateDocumentModel.comments,
                {
                  ...commentAdd,
                  id,
                  order: maxComment.order + 1,
                },
              ],
            };
          }
        )
      ),
      switchMapTo(this.findOne$(id, commentAdd.entityId))
    );
  }

  update$(
    id: string,
    entityId: string,
    commentUpdate: CommentUpdate
  ): Observable<Comment> {
    return this.contentProvider
      .update$(
        ContentType.Comment,
        id,
        entityId,
        this.entityModel,
        (documentModel) => {
          const foundComment = documentModel.comments.find(
            (comment) => comment.id == id
          );
          return {
            comments: [
              ...documentModel.comments.filter((comment) => comment.id !== id),
              { ...foundComment, ...commentUpdate },
            ],
          } as Partial<DocumentModel>;
        }
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  findOne$(id: string, entityId: string): Observable<Comment> {
    return this.contentProvider
      .findOne$(ContentType.Comment, id, entityId, this.entityModel)
      .pipe(
        map((documentModel) =>
          this.contentProvider.toComment(
            documentModel.comments.find((comment) => comment.id == id)
          )
        )
      );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.contentProvider.remove$(
      ContentType.Comment,
      id,
      entityId,
      this.entityModel,
      (documentModel) => {
        return {
          comments: [
            ...documentModel.comments.filter((comment) => comment.id !== id),
          ],
          emotions: [
            ...documentModel.emotions.filter(
              (emotion) => emotion.commentId !== id
            ),
          ],
        } as Partial<DocumentModel>;
      }
    );
  }
}
