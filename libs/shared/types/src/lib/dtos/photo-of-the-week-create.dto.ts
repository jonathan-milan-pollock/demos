import { IsNumberString, IsString } from 'class-validator';

export class PhotoOfTheWeekCreateDto {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
