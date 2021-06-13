import {
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Comment } from '@dark-rush-photography/shared-types';

export class CommentDto implements Comment {
  @IsMongoId()
  entityId!: string;

  @IsString()
  @IsOptional()
  mediaSlug?: string;

  @IsUUID()
  id!: string;

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
