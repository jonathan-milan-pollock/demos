import { IsString } from 'class-validator';

export class MediaProcessUpdateDto {
  @IsString()
  slug!: string;
}
