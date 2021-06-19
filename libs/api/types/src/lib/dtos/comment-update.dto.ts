import { IsString } from 'class-validator';

import { Comment } from '@dark-rush-photography/shared-types';

export class CommentUpdateDto implements Partial<Comment> {
  @IsString()
  text!: string;
}
