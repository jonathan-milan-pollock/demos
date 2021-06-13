import { IsInt, IsMongoId, IsOptional, IsString, Min } from 'class-validator';

import { Comment } from '@dark-rush-photography/shared-types';

export class CommentDto implements Comment {
  @IsString()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsString()
  @IsOptional()
  mediaSlug?: string;

  @IsInt()
  @Min(0)
  order!: number;

  @IsString()
  userName!: string;

  @IsString()
  userImage!: string;

  @IsString()
  text!: string;
}
