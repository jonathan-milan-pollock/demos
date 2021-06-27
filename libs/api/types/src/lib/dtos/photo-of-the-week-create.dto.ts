import { IsNumberString, IsString } from 'class-validator';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';

export class PhotoOfTheWeekCreateDto implements Partial<PhotoOfTheWeek> {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
