import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Emotion, EmotionType } from '@dark-rush-photography/shared/types';
import { UserDto } from './user.dto';

export class EmotionDto implements Emotion {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  @IsOptional()
  imageId?: string;

  @IsUUID()
  @IsOptional()
  commentId?: string;

  @IsEnum(EmotionType)
  type!: EmotionType;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
}
