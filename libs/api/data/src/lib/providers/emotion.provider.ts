import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Emotion } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toEmotion } from '../functions/emotion.functions';

@Injectable()
export class EmotionProvider {
  findById$(
    documentModel: Model<DocumentModel>,
    id: string,
    entityId: string
  ): Observable<Emotion> {
    return from(documentModel.findById(entityId)).pipe(
      map((response) => {
        if (!response)
          throw new NotFoundException('Could not find entity for emotion');

        const foundEmotion = response.emotions.find((e) => e.id === id);
        if (!foundEmotion)
          throw new NotFoundException('Could not find emotion by id');

        return toEmotion(foundEmotion);
      })
    );
  }
}
