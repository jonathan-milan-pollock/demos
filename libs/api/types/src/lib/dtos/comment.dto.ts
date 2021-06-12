import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Comment } from '@dark-rush-photography/shared-types';
import { EmotionDto } from './emotion.dto';

export class CommentDto implements Comment {
  @IsNumber()
  order!: number;

  @IsString()
  userName!: string;

  @IsString()
  userImage!: string;

  @IsString()
  text!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions: EmotionDto[] = [];
}
