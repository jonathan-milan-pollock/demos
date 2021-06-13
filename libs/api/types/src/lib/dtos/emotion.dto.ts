import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

import { Emotion, EmotionType } from '@dark-rush-photography/shared-types';

export class EmotionDto implements Emotion {
  @IsEnum(EmotionType)
  type!: EmotionType;

  @IsMongoId()
  entityId!: string;

  @IsString()
  @IsOptional()
  mediaSlug?: string;

  @IsString()
  @IsOptional()
  commentId?: string;

  @IsString()
  userName!: string;

  @IsString()
  userImage!: string;
}
