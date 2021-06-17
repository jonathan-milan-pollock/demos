import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Event } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { EventsService } from './events.service';

@Controller('v1/events')
@Public()
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll$(): Observable<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne$(@Param('id') id: string): Observable<Event> {
    return this.eventsService.findOne(id);
  }
}
