import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import { Comment } from '@dark-rush-photography/shared-types';
import {
  CommentAddDto,
  CommentUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  CommentProvider,
  Document,
  DocumentModel,
} from '@dark-rush-photography/api/data';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly commentProvider: CommentProvider
  ) {}

  addEntityComment$(
    entityId: string,
    comment: CommentAddDto
  ): Observable<Comment> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add comment');

        return this.commentProvider.add$(
          response,
          this.entityModel,
          comment,
          id,
          entityId
        );
      }),
      switchMapTo(
        this.commentProvider.findById$(this.entityModel, id, entityId)
      )
    );
  }

  addMediaComment$(
    entityId: string,
    mediaId: string,
    comment: CommentAddDto
  ): Observable<Comment> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add comment');

        const image = response.images.find((i) => i.id === mediaId);
        if (image) {
          return this.commentProvider.add$(
            response,
            this.entityModel,
            comment,
            id,
            entityId,
            mediaId
          );
        }
        const video = response.videos.find((v) => v.id === mediaId);
        if (video) {
          return this.commentProvider.add$(
            response,
            this.entityModel,
            comment,
            id,
            entityId,
            mediaId
          );
        }

        throw new NotFoundException('Could not find media to add comment');
      }),
      switchMapTo(
        this.commentProvider.findById$(this.entityModel, id, entityId)
      )
    );
  }

  update$(
    id: string,
    entityId: string,
    comment: CommentUpdateDto
  ): Observable<Comment> {
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to update comment'
          );

        const foundComment = response.comments.find((c) => c.id === id);
        if (!foundComment)
          throw new NotFoundException('Could not find comment to update');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            comments: [
              ...response.comments.filter((c) => c.id !== id),
              {
                ...foundComment,
                ...comment,
              },
            ],
          })
        );
      }),
      switchMapTo(
        this.commentProvider.findById$(this.entityModel, id, entityId)
      )
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to remove comment'
          );

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            comments: [...response.comments.filter((c) => c.id !== id)],
            emotions: [...response.emotions.filter((e) => e.commentId !== id)],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException('Unable to remove comment');
        }
      })
    );
  }
}
