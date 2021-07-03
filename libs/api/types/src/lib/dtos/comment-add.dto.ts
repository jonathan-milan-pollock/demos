import {
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CommentAdd } from '@dark-rush-photography/shared/types';
import { UserDto } from './user.dto';

export class CommentAddDto implements CommentAdd {
  @IsMongoId()
  entityId!: string;

  @IsUUID()
  @IsOptional()
  mediaId?: string;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;

  @IsString()
  text!: string;
}
