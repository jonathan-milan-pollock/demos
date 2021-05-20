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
import { AdminEventsService } from './admin-events.service';

@Controller('admin/events')
export class AdminEventsController {
  constructor(private readonly adminEventsService: AdminEventsService) {}

  @Post()
  async addEvent(@Body() event: Event): Promise<{ id: string }> {
    const id = await this.adminEventsService.addEvent(event);
    return { id };
  }

  @Put(':id')
  async updateEvent(
    @Param() id: string,
    @Body() event: Event
  ): Promise<{ slug: string }> {
    return {
      slug: await this.adminEventsService.updateEvent(id, event),
    };
  }

  @Delete(':id')
  async deleteEvent(@Param() id: string): Promise<void> {
    await this.adminEventsService.deleteEvent(id);
  }
}
