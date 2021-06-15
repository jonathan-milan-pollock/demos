import {
  IsEmail,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { User } from '@dark-rush-photography/shared-types';

export class UserDto implements User {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  image!: string;
}
