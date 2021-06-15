import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';
import { UserDto } from './user.dto';

export class EmotionDto implements Emotion {
  @IsMongoId()
  entityId!: string;

  @IsString()
  @IsOptional()
  mediaSlug?: string;

  @IsUUID()
  @IsOptional()
  commentId?: string;

  @IsEnum(EmotionType)
  type!: EmotionType;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
}
