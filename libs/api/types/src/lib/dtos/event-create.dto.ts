import { IsNumberString, IsString } from 'class-validator';

import { Event } from '@dark-rush-photography/shared-types';

export class EventCreateDto implements Partial<Event> {
  @IsNumberString()
  group!: string;

  @IsString()
  slug!: string;
}
