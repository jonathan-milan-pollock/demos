import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { mapTo, Observable } from 'rxjs';

import { Emotion, EmotionAddDto } from '@dark-rush-photography/shared/types';
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

  findOne$(id: string, entityId: string): Observable<Emotion> {
    return this.emotionProvider.findOne$(id, entityId, this.entityModel);
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.emotionProvider
      .remove$(id, entityId, this.entityModel)
      .pipe(mapTo(undefined));
  }
}
