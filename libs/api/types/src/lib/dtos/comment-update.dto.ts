import { IsString } from 'class-validator';

import { CommentUpdate } from '@dark-rush-photography/shared/types';

export class CommentUpdateDto implements CommentUpdate {
  @IsString()
  text!: string;
}
