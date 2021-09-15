import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Emotion } from '@dark-rush-photography/shared/types';
import { EmotionAddDto } from '@dark-rush-photography/api/types';
import {
  Document,
  DocumentModel,
  EmotionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class UserEmotionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly emotionProvider: EmotionProvider
  ) {}

  add$(emotionAdd: EmotionAddDto): Observable<Emotion> {
    return this.emotionProvider.add$(emotionAdd, this.entityModel);
  }

  findAll$(
    entityId: string,
    mediaId?: string,
    commentId?: string
  ): Observable<Emotion[]> {
    return this.emotionProvider.findAll$(
      entityId,
      this.entityModel,
      mediaId,
      commentId
    );
  }

  findOne$(id: string, entityId: string): Observable<Emotion> {
    return this.emotionProvider.findOne$(id, entityId, this.entityModel);
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.emotionProvider
      .remove$(id, entityId, this.entityModel)
      .pipe(map(() => undefined));
  }
}
