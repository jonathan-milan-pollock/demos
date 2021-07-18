import { IsInt, IsString, Min } from 'class-validator';

export class AboutUpdateDto {
  @IsString()
  slug!: string;

  @IsInt()
  @Min(0)
  order!: number;
}
