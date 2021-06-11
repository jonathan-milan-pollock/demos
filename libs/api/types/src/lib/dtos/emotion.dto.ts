import { IsDefined, IsEnum } from 'class-validator';

import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';

export class EmotionDto implements Emotion {
  @IsEnum(EmotionType)
  type!: EmotionType;

  @IsDefined()
  userName!: string;

  @IsDefined()
  userImage!: string;
}
