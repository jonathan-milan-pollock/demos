import { IsInt, IsString, Min } from 'class-validator';

export class PhotoOfTheWeekCreateDto {
  @IsInt()
  @Min(0)
  group!: number;

  @IsString()
  slug!: string;
}
