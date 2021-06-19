import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';
import { UserDto } from './user.dto';

export class EmotionAddDto implements Partial<Emotion> {
  @IsEnum(EmotionType)
  type!: EmotionType;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
}
