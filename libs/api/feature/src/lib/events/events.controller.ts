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
  async getEvents(): Promise<Event[]> {
    return await this.eventsService.getEvents();
  }

  @Get(':id')
  async getEvent(@Param() id: string): Promise<Event> {
    return this.eventsService.getEvent(id);
  }

  @Post()
  async addEvent(@Body() event: Event): Promise<{ id: string }> {
    const id = await this.eventsService.addEvent(event);
    return { id };
  }

  @Put(':id')
  async updateEvent(
    @Param() id: string,
    @Body() event: Event
  ): Promise<{ slug: string }> {
    return {
      slug: await this.eventsService.updateEvent(id, event),
    };
  }

  @Delete(':id')
  async deleteEvent(@Param() id: string): Promise<void> {
    await this.eventsService.deleteEvent(id);
  }
}
