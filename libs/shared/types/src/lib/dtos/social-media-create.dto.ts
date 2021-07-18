import { IsString } from 'class-validator';

export class SocialMediaCreateDto {
  @IsString()
  group!: string;

  @IsString()
  slug!: string;
}
