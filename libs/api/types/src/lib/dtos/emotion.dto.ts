import { IsEnum, IsString } from 'class-validator';

import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';

export class EmotionDto implements Emotion {
  @IsEnum(EmotionType)
  type!: EmotionType;

  @IsString()
  userName!: string;

  @IsString()
  userImage!: string;
}
