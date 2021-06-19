import { Injectable, NotFoundException } from '@nestjs/common';

import { Emotion } from '@dark-rush-photography/shared-types';
import { toEmotion } from '../functions/emotion.functions';
import { Model } from 'mongoose';
import { DocumentModel } from '../schema/document.schema';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EmotionProvider {
  findById$ = (
    documentModel: Model<DocumentModel>,
    entityId: string,
    id: string
  ): Observable<Emotion> => {
    return from(documentModel.findById(entityId).exec()).pipe(
      map((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity for emotion');

        const foundEmotion = response.emotions.find((i) => i.id === id);
        if (!foundEmotion)
          throw new NotFoundException('Could not find emotion by id');

        return toEmotion(foundEmotion);
      })
    );
  };
}
