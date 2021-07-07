import {
  Controller,
  Body,
  Param,
  Post,
  HttpCode,
  UseGuards,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Event } from '@dark-rush-photography/shared/types';
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
  create$(@Body() eventCreate: EventCreateDto): Observable<Event> {
    return this.adminEventsService.create$(eventCreate);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: EventDto })
  update$(
    @Param('id') id: string,
    @Body() eventUpdate: EventUpdateDto
  ): Observable<Event> {
    return this.adminEventsService.update$(id, eventUpdate);
  }

  @Roles(ADMIN)
  @Post(':id/post')
  @HttpCode(204)
  post$(@Param('id') id: string): Observable<void> {
    return this.adminEventsService.post$(id);
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
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminEventsService.delete$(id);
  }
}
