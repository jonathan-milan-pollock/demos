import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map, switchMapTo } from 'rxjs/operators';

import {
  ContentType,
  Emotion,
  EmotionAdd,
} from '@dark-rush-photography/shared/types';
import {
  ContentProvider,
  Document,
  DocumentModel,
} from '@dark-rush-photography/api/data';

@Injectable()
export class UserEmotionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentProvider: ContentProvider
  ) {}

  // TODO: when remove image or video check that comments and emotions removed
  add$(emotionAdd: EmotionAdd): Observable<Emotion> {
    const id = uuidv4();
    return this.contentProvider
      .add$(
        ContentType.Emotion,
        emotionAdd.entityId,
        this.entityModel,
        () => false,
        (documentModel) => {
          const validateDocumentModel = this.contentProvider.validateAddEmotion(
            emotionAdd,
            documentModel
          );
          return {
            emotions: [
              ...validateDocumentModel.emotions,
              {
                ...emotionAdd,
                id,
              },
            ],
          };
        }
      )
      .pipe(switchMapTo(this.findOne$(id, emotionAdd.entityId)));
  }

  findOne$(id: string, entityId: string): Observable<Emotion> {
    return this.contentProvider
      .findOne$(ContentType.Emotion, id, entityId, this.entityModel)
      .pipe(
        map((documentModel) =>
          this.contentProvider.toEmotion(
            documentModel.emotions.find((emotion) => emotion.id == id)
          )
        )
      );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.contentProvider.remove$(
      ContentType.Emotion,
      id,
      entityId,
      this.entityModel,
      (documentModel) => {
        return {
          images: [...documentModel.images.filter((image) => image.id !== id)],
        } as Partial<DocumentModel>;
      }
    );
  }
}
