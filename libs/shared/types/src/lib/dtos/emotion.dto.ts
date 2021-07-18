import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EmotionType } from '../enums/emotion-type.enum';
import { UserDto } from './user.dto';
import { Emotion } from '../interfaces/emotion.interface';

export class EmotionDto implements Emotion {
  @IsUUID()
  id!: string;

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
