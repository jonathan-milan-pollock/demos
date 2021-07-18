import { IsString } from 'class-validator';

export class AboutCreateDto {
  @IsString()
  slug!: string;
}
