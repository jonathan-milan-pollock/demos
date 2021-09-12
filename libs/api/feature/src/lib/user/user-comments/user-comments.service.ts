import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Comment,
  CommentAddDto,
  CommentUpdateDto,
} from '@dark-rush-photography/shared/types';
import {
  CommentProvider,
  Document,
  DocumentModel,
} from '@dark-rush-photography/api/data';

//TODO: Want to get the user information from the authenticated request
@Injectable()
export class UserCommentsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly commentProvider: CommentProvider
  ) {}

  add$(commentAdd: CommentAddDto): Observable<Comment> {
    return this.commentProvider.add$(commentAdd, this.entityModel);
  }

  update$(
    id: string,
    entityId: string,
    commentUpdate: CommentUpdateDto
  ): Observable<Comment> {
    return this.commentProvider.update$(
      id,
      entityId,
      commentUpdate,
      this.entityModel
    );
  }

  findAll$(entityId: string, mediaId?: string): Observable<Comment[]> {
    return this.commentProvider.findAll$(entityId, this.entityModel, mediaId);
  }

  findOne$(id: string, entityId: string): Observable<Comment> {
    return this.commentProvider.findOne$(id, entityId, this.entityModel);
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.commentProvider
      .remove$(id, entityId, this.entityModel)
      .pipe(map(() => undefined));
  }
}
