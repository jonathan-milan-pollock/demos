import { Injectable } from '@nestjs/common';

import { Emotion } from '@dark-rush-photography/shared-types';

@Injectable()
export class EmotionProvider {
  toEmotion(emotion: Emotion): Emotion {
    return {
      entityId: emotion.entityId,
      mediaSlug: emotion.mediaSlug,
      commentId: emotion.commentId,
      type: emotion.type,
      user: emotion.user,
    };
  }
}
