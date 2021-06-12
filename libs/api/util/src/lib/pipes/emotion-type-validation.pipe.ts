import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { EmotionType } from '@dark-rush-photography/shared-types';

@Injectable()
export class EmotionTypeValidationPipe
  implements PipeTransform<string, EmotionType> {
  readonly emotionTypeMap = new Map<string, EmotionType>([
    ['like', EmotionType.Like],
    ['love', EmotionType.Love],
    ['care', EmotionType.Care],
    ['haha', EmotionType.Haha],
    ['wow', EmotionType.Wow],
  ]);

  transform(emotionType: string): EmotionType {
    const emotionTypeEnum = this.emotionTypeMap.get(emotionType.toLowerCase());
    if (!emotionTypeEnum)
      throw new BadRequestException(`Invalid EmotionType ${emotionType}`);
    return emotionTypeEnum;
  }
}
