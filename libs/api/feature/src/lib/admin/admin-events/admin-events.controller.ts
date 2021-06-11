import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Event } from '@dark-rush-photography/shared-types';
import { AdminEventsService } from './admin-events.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { EventDto } from '@dark-rush-photography/api/types';

@Controller('admin/v1/events')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Events')
export class AdminEventsController {
  constructor(private readonly adminEventsService: AdminEventsService) {}

  @Roles('admin')
  @Post()
  create(@Body() event: EventDto): Observable<Event> {
    return this.adminEventsService.create(event);
  }

  @Roles('admin')
  @Put(':id')
  update(@Param() id: string, @Body() event: EventDto): Observable<Event> {
    return this.adminEventsService.update(id, event);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() id: string): Observable<void> {
    return this.adminEventsService.delete(id);
  }
}
