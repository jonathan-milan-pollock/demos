import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { IsNumberString, IsString } from 'class-validator';

export class PhotoOfTheWeekCreateDto implements Partial<PhotoOfTheWeek> {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
