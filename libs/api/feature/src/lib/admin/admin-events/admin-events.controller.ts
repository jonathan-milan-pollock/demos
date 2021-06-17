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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Event } from '@dark-rush-photography/shared-types';
import { EventDto, EventUpdateDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminEventsService } from './admin-events.service';

@Controller('admin/v1/events')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Events')
export class AdminEventsController {
  constructor(private readonly adminEventsService: AdminEventsService) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: EventDto })
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  create$(@Body() event: EventUpdateDto): Observable<Event> {
    return this.adminEventsService.create$(event);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: EventDto })
  @ApiNotFoundResponse()
  update$(
    @Param('id') id: string,
    @Body() event: EventUpdateDto
  ): Observable<Event> {
    return this.adminEventsService.update$(id, event);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminEventsService.delete$(id);
  }
}
