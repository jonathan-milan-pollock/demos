import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EmotionAdd, EmotionType } from '@dark-rush-photography/shared/types';
import { UserDto } from './user.dto';

export class EmotionAddDto implements EmotionAdd {
  @IsMongoId()
  entityId!: string;

  @IsUUID()
  @IsOptional()
  mediaId?: string;

  @IsUUID()
  @IsOptional()
  commentId?: string;

  @IsEnum(EmotionType)
  type!: EmotionType;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;
}
