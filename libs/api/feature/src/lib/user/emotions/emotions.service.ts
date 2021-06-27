import { Injectable } from '@nestjs/common';
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
  DocumentModelProvider,
  EmotionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class EmotionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly emotionProvider: EmotionProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  addEntityEmotion$(
    entityId: string,
    emotionAdd: EmotionAddDto
  ): Observable<Emotion> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.emotionProvider.addEntityEmotion(
              id,
              entityId,
              emotionAdd,
              documentModel.emotions
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  addMediaEmotion$(
    entityId: string,
    mediaId: string,
    emotionAdd: EmotionAddDto
  ): Observable<Emotion> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        this.emotionProvider.validateAddMediaEmotion(
          mediaId,
          documentModel.images,
          documentModel.videos
        );
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.emotionProvider.addMediaEmotion(
              id,
              entityId,
              mediaId,
              emotionAdd,
              documentModel.emotions
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  addCommentEmotion$(
    entityId: string,
    commentId: string,
    emotionAdd: EmotionAddDto
  ): Observable<Emotion> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        this.emotionProvider.validateAddCommentEmotion(
          commentId,
          documentModel.comments
        );
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.emotionProvider.addCommentEmotion(
              id,
              entityId,
              commentId,
              emotionAdd,
              documentModel.emotions
            )
          )
        );
      }),
      switchMapTo(this.findOne$(id, entityId))
    );
  }

  findOne$(id: string, entityId: string): Observable<Emotion> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      map((documentModel) =>
        this.emotionProvider.validateFindEmotion(id, documentModel.emotions)
      ),
      map((emotion) => this.emotionProvider.toEmotion(emotion))
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(this.documentModelProvider.validateFind),
      switchMap((documentModel) => {
        return from(
          this.entityModel.findByIdAndUpdate(
            entityId,
            this.emotionProvider.removeEmotion(id, documentModel.emotions)
          )
        );
      }),
      map(this.documentModelProvider.validateRemove)
    );
  }
}
