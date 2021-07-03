import { IsNumberString, IsString } from 'class-validator';

import { EventCreate } from '@dark-rush-photography/shared/types';

export class EventCreateDto implements EventCreate {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
