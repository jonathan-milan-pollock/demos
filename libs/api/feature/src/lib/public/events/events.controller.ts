import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Event } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { EventsService } from './events.service';
import { EventDto } from '@dark-rush-photography/api/types';

@Controller('v1/events')
@Public()
@ApiTags('Events Public')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOkResponse({ type: [EventDto] })
  findAll$(): Observable<Event[]> {
    return this.eventsService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: EventDto })
  findOne$(@Param('id') id: string): Observable<Event> {
    return this.eventsService.findOne$(id);
  }
}
