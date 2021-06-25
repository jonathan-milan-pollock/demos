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

import { Emotion } from '@dark-rush-photography/shared-types';
import { EmotionAddDto } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  EmotionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EmotionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly emotionProvider: EmotionProvider
  ) {}

  addEntityEmotion$(
    entityId: string,
    emotion: EmotionAddDto
  ): Observable<Emotion> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add emotion');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            emotions: [
              ...response.emotions,
              {
                ...emotion,
                id,
                entityId,
              },
            ],
          })
        );
      }),
      switchMapTo(
        this.emotionProvider.findById$(this.entityModel, id, entityId)
      )
    );
  }

  addCommentEmotion$(
    entityId: string,
    commentId: string,
    emotion: EmotionAddDto
  ): Observable<Emotion> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add emotion');

        const comment = response.comments.find((c) => c.id === commentId);
        if (!comment)
          throw new NotFoundException('Could not find comment to add emotion');

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            emotions: [
              ...response.emotions,
              {
                ...emotion,
                id,
                entityId,
                commentId,
              },
            ],
          })
        );
      }),
      switchMapTo(
        this.emotionProvider.findById$(this.entityModel, id, entityId)
      )
    );
  }

  addMediaEmotion$(
    entityId: string,
    mediaId: string,
    emotion: EmotionAddDto
  ): Observable<Emotion> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity to add emotion');
        const image = response.images.find((i) => i.id === mediaId);
        const video = response.videos.find((v) => v.id === mediaId);
        if (!image && !video) {
          return from(
            this.entityModel.findByIdAndUpdate(entityId, {
              emotions: [
                ...response.emotions,
                {
                  ...emotion,
                  id,
                  entityId,
                  mediaId,
                },
              ],
            })
          );
        }
        throw new NotFoundException('Could not find media to add emotion');
      }),
      switchMapTo(
        this.emotionProvider.findById$(this.entityModel, id, entityId)
      )
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      switchMap((response) => {
        if (!response)
          throw new NotFoundException(
            'Could not find entity to remove emotion'
          );

        return from(
          this.entityModel.findByIdAndUpdate(entityId, {
            emotions: [...response.emotions.filter((e) => e.id !== id)],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException('Unable to remove emotion');
        }
      })
    );
  }
}
