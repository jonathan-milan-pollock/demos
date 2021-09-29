import {
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { UserDto } from './user.dto';

export class CommentAddDto {
  @IsMongoId()
  entityId!: string;

  @IsUUID()
  @IsOptional()
  imageId?: string;

  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto;

  @IsString()
  text!: string;
}
