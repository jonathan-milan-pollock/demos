import { IsString } from 'class-validator';

export class SocialMediaUpdateDto {
  @IsString()
  group!: string;

  @IsString()
  slug!: string;
}
