import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { Event } from '@dark-rush-photography/shared-types';
import { AdminEventsService } from './admin-events.service';

@Controller('admin/v1/events')
export class AdminEventsController {
  constructor(private readonly adminEventsService: AdminEventsService) {}

  @Post()
  addEvent(@Body() event: Event): Observable<Event> {
    return this.adminEventsService.addEvent(event);
  }

  @Put(':id')
  updateEvent(@Param() id: string, @Body() event: Event): Observable<Event> {
    return this.adminEventsService.updateEvent(id, event);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteEvent(@Param() id: string): Observable<void> {
    return this.adminEventsService.deleteEvent(id);
  }
}
