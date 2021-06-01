import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  Get,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  BestOfEvents,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { AdminBestOfEventsService } from './admin-best-of-events.service';

@Controller('admin/v1/best-of/events')
export class AdminBestOfEventsController {
  constructor(
    private readonly adminBestOfEventsService: AdminBestOfEventsService
  ) {}

  @Post()
  addBestOfEvents(
    @Body() bestOfEvents: BestOfEvents
  ): Observable<BestOfEvents> {
    return this.adminBestOfEventsService.addBestOfEvents(bestOfEvents);
  }

  @Put(':id')
  updateBestOfEvents(
    @Param() id: string,
    @Body() bestOfEvents: BestOfEvents
  ): Observable<BestOfEvents> {
    return this.adminBestOfEventsService.updateBestOfEvents(id, bestOfEvents);
  }

  @Get('images/:dimension')
  getImages(@Param() dimension: string): Observable<string[]> {
    return this.adminBestOfEventsService.getImages(
      dimension as ImageDimensionType
    );
  }

  @Get('images/:slug/:dimension')
  getImage(
    @Param() slug: string,
    @Param() dimension: string
  ): Observable<string> {
    return this.adminBestOfEventsService.getImage(
      slug,
      dimension as ImageDimensionType
    );
  }

  @HttpCode(204)
  @Delete(':id')
  deleteBestOfEvents(@Param() id: string): Observable<void> {
    return this.adminBestOfEventsService.deleteBestOfEvents(id);
  }
}
