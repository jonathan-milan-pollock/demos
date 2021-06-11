import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { EmotionType } from '@dark-rush-photography/shared-types';

@Injectable()
export class EmotionTypeValidationPipe implements PipeTransform {
  transform(emotionType: string): EmotionType {
    switch (emotionType.toLowerCase()) {
      case EmotionType.Like.toLowerCase():
        return EmotionType.Like;
      case EmotionType.Love.toLowerCase():
        return EmotionType.Love;
      case EmotionType.Care.toLowerCase():
        return EmotionType.Care;
      case EmotionType.Haha.toLowerCase():
        return EmotionType.Haha;
      case EmotionType.Wow.toLowerCase():
        return EmotionType.Wow;
      default:
        throw new BadRequestException(`Invalid EmotionType ${emotionType}`);
    }
  }
}
