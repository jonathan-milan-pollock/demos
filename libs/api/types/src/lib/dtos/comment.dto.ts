import {
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Comment } from '@dark-rush-photography/shared/types';
import { UserDto } from './user.dto';

export class CommentDto implements Comment {
  @IsUUID()
  id!: string;

  @IsMongoId()
  entityId!: string;

  @IsUUID()
  @IsOptional()
  imageId?: string;

  @IsInt()
  @Min(0)
  order!: number;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;

  @IsString()
  text!: string;
}
