import { Controller, Param, Get } from '@nestjs/common';

import { Event } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Public()
  async getEvents(): Promise<Event[]> {
    return await this.eventsService.getEvents();
  }

  @Get(':id')
  @Public()
  async getEvent(@Param() id: string): Promise<Event> {
    return this.eventsService.getEvent(id);
  }
}
