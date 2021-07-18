import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { EventDto, EventMinimalDto } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { EventsService } from './events.service';

@Controller({ path: 'events', version: '1' })
@Public()
@ApiTags('Public Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOkResponse({ type: [EventMinimalDto] })
  findAll$(): Observable<EventMinimalDto[]> {
    return this.eventsService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: EventDto })
  findOne$(@Param('id', ParseObjectIdPipe) id: string): Observable<EventDto> {
    return this.eventsService.findOne$(id);
  }
}
