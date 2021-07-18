import { IsString } from 'class-validator';

export class ReviewCreateDto {
  @IsString()
  slug!: string;
}
