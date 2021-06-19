import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Comment } from '@dark-rush-photography/shared-types';
import { UserDto } from './user.dto';

export class CommentAddDto implements Partial<Comment> {
  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;

  @IsString()
  text!: string;
}
