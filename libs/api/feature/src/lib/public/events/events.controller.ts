import { Controller, Param, Get } from '@nestjs/common';

import { Observable } from 'rxjs';

import { Event } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { EventsService } from './events.service';

@Controller('v1/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get()
  getEvents(): Observable<Event[]> {
    return this.eventsService.getEvents();
  }

  @Public()
  @Get(':id')
  getEvent(@Param() id: string): Observable<Event> {
    return this.eventsService.getEvent(id);
  }
}
