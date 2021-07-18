import { IsEmail, IsString } from 'class-validator';

import { User } from '../interfaces/user.interface';

export class UserDto implements User {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  image!: string;
}
