import { IsArray, IsDefined, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Comment } from '@dark-rush-photography/shared-types';
import { EmotionDto } from './emotion.dto';

export class CommentDto implements Comment {
  @IsNumber()
  order!: number;

  @IsDefined()
  userName!: string;

  @IsDefined()
  userImage!: string;

  @IsDefined()
  text!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmotionDto)
  emotions!: EmotionDto[];
}
