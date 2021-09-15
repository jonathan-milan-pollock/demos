import { IsString } from 'class-validator';

export class MediaProcessCreateDto {
  @IsString()
  slug!: string;
}
