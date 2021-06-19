import { IsEnum, IsMongoId, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';
import { UserDto } from './user.dto';

export class EmotionDto implements Emotion {
  @IsMongoId()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsMongoId()
  @IsOptional()
  commentId?: string;

  @IsMongoId()
  @IsOptional()
  mediaId?: string;

  @IsEnum(EmotionType)
  type!: EmotionType;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
}
