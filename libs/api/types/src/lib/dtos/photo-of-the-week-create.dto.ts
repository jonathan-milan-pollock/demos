import { IsNumberString, IsString } from 'class-validator';

import { PhotoOfTheWeekCreate } from '@dark-rush-photography/shared/types';

export class PhotoOfTheWeekCreateDto implements PhotoOfTheWeekCreate {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
