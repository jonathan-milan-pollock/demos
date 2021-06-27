import { Injectable, NotFoundException } from '@nestjs/common';

import {
  Comment,
  Emotion,
  Image,
  Video,
} from '@dark-rush-photography/shared-types';
import { EmotionAddDto } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toEmotion } from '../functions/emotion.functions';

@Injectable()
export class EmotionProvider {
  toEmotion = (emotion: Emotion): Emotion => toEmotion(emotion);

  addEntityEmotion = (
    id: string,
    entityId: string,
    emotionAdd: EmotionAddDto,
    emotions: Emotion[]
  ): Partial<DocumentModel> => ({
    emotions: [
      ...emotions,
      {
        ...emotionAdd,
        id,
        entityId,
      },
    ],
  });

  addMediaEmotion = (
    id: string,
    entityId: string,
    mediaId: string,
    emotionAdd: EmotionAddDto,
    emotions: Emotion[]
  ): Partial<DocumentModel> => ({
    emotions: [
      ...emotions,
      {
        ...emotionAdd,
        id,
        entityId,
        mediaId,
      },
    ],
  });

  addCommentEmotion = (
    id: string,
    entityId: string,
    commentId: string,
    emotionAdd: EmotionAddDto,
    emotions: Emotion[]
  ): Partial<DocumentModel> => ({
    emotions: [
      ...emotions,
      {
        ...emotionAdd,
        id,
        entityId,
        commentId,
      },
    ],
  });

  validateAddMediaEmotion(
    mediaId: string,
    images: Image[],
    videos: Video[]
  ): string {
    const image = images.find((i) => i.id === mediaId);
    const video = videos.find((v) => v.id === mediaId);
    if (!image && !video)
      throw new NotFoundException('Could not find media for emotion');

    return mediaId;
  }

  validateAddCommentEmotion(commentId: string, comments: Comment[]): string {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment)
      throw new NotFoundException('Could not find comment for emotion');

    return commentId;
  }

  validateFindEmotion(id: string, emotions: Emotion[]): Emotion {
    const foundEmotion = emotions.find((e) => e.id === id);
    if (!foundEmotion)
      throw new NotFoundException('Could not find emotion by id');

    return foundEmotion;
  }

  removeEmotion = (
    id: string,
    emotions: Emotion[]
  ): Partial<DocumentModel> => ({
    emotions: [...emotions.filter((e) => e.id !== id)],
  });
}
