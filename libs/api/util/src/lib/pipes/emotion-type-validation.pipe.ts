import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { EmotionType } from '@dark-rush-photography/shared-types';

@Injectable()
export class EmotionTypeValidationPipe
  implements PipeTransform<string, EmotionType> {
  transform(emotionType: string): EmotionType {
    const emotionTypeKey = Object.keys(EmotionType).find(
      (e) => e.toLowerCase() === emotionType.toLowerCase()
    );
    if (!emotionTypeKey) {
      throw new BadRequestException(`Invalid EmotionType ${emotionType}`);
    }
    return emotionTypeKey as EmotionType;
  }
}
