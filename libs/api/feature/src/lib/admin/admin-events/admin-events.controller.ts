import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Event } from '@dark-rush-photography/shared-types';
import {
  EventCreateDto,
  EventDto,
  EventUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminEventsService } from './admin-events.service';

@Controller('admin/v1/events')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Events')
export class AdminEventsController {
  constructor(private readonly adminEventsService: AdminEventsService) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: EventDto })
  create$(@Body() event: EventCreateDto): Observable<Event> {
    return this.adminEventsService.create$(event);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: EventDto })
  update$(
    @Param('id') id: string,
    @Body() event: EventUpdateDto
  ): Observable<Event> {
    return this.adminEventsService.update$(id, event);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: [EventDto] })
  findAll$(): Observable<Event[]> {
    return this.adminEventsService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: EventDto })
  findOne$(@Param('id') id: string): Observable<Event> {
    return this.adminEventsService.findOne$(id);
  }

  @Roles(ADMIN)
  @Post(':id/post')
  post$(@Param('id') id: string): Observable<Event> {
    return this.adminEventsService.post$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminEventsService.delete$(id);
  }
}
