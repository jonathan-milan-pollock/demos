import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { Event } from '@dark-rush-photography/shared-types';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(): Event[] {
    return this.eventsService.getEvents();
  }

  @Get(':slug')
  getPhotoOfTheWeek(@Param() slug: string): Event {
    return this.eventsService.getEvent(slug);
  }

  @Post()
  addEvent(@Body() event: Event): { slug: string } {
    const slug = this.eventsService.addEvent(event);
    return { slug };
  }
}
