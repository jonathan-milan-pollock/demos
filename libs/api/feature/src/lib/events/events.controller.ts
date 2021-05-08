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
  async getEventsAsync(): Promise<Event[]> {
    return await this.eventsService.getEventsAsync();
  }

  @Get(':id')
  async getEvent(@Param() id: string): Promise<Event> {
    return this.eventsService.getEventAsync(id);
  }

  @Post()
  async addEventAsync(@Body() event: Event): Promise<{ id: string }> {
    const id = await this.eventsService.addEventAsync(event);
    return { id };
  }

  @Put(':id')
  async updateEvent(
    @Param() id: string,
    @Body() event: Event
  ): Promise<{ slug: string }> {
    return {
      slug: await this.eventsService.updateEventAsync(id, event),
    };
  }

  @Delete(':id')
  async deleteEvent(@Param() id: string): Promise<void> {
    await this.eventsService.deleteEventAsync(id);
  }
}
