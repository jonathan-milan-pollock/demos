import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, max, switchMap, switchMapTo } from 'rxjs/operators';

import { Comment } from '@dark-rush-photography/shared-types';
import {
  CommentAddDto,
  CommentUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  CommentProvider,
  Document,
  DocumentModel,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly commentProvider: CommentProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  addEntityComment$(
    entityId: string,
    commentAdd: CommentAddDto
  ): Observable<Comment> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) =>
        combineLatest([
          of(documentModel),
          from(documentModel.comments).pipe(max((comment) => comment.order)),
        ])
      ),
      switchMap(([documentModel, maxComment]) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.commentProvider.addEntityComment(
              id,
              entityId,
              maxComment.order,
              commentAdd,
              documentModel.comments
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  addMediaComment$(
    entityId: string,
    mediaId: string,
    commentAdd: CommentAddDto
  ): Observable<Comment> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) =>
        combineLatest([
          of(documentModel),
          from(documentModel.comments).pipe(max((comment) => comment.order)),
        ])
      ),
      switchMap(([documentModel, maxComment]) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.commentProvider.addMediaComment(
              id,
              entityId,
              mediaId,
              maxComment.order,
              commentAdd,
              documentModel.comments
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  update$(
    id: string,
    entityId: string,
    commentUpdate: CommentUpdateDto
  ): Observable<Comment> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        const foundComment = this.commentProvider.validateFindComment(
          id,
          documentModel.comments
        );

        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.commentProvider.updateComment(
              id,
              foundComment,
              commentUpdate,
              documentModel.comments
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  findOne$(id: string, entityId: string): Observable<Comment> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      map((documentModel) =>
        this.commentProvider.validateFindComment(id, documentModel.comments)
      ),
      map((comment) => this.commentProvider.toComment(comment))
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.commentProvider.removeComment(
              id,
              documentModel.comments,
              documentModel.emotions
            )
          )
        );
      }),
      map(this.documentModelProvider.validateRemove)
    );
  }
}
