import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';

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

  @IsString()
  userName!: string;

  @IsString()
  userImage!: string;
}
