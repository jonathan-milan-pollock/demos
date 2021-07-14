import {
  Controller,
  Body,
  Param,
  Post,
  HttpCode,
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

import { Destination } from '@dark-rush-photography/shared/types';
import {
  DestinationDto,
  DestinationUpdateDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminDestinationsService } from './admin-destinations.service';

@Controller({ path: 'admin/destinations', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Destinations')
export class AdminDestinationsController {
  constructor(
    private readonly adminDestinationsService: AdminDestinationsService
  ) {}

  @Post(':slug')
  @ApiCreatedResponse({ type: DestinationDto })
  create$(@Param('slug') slug: string): Observable<Destination> {
    return this.adminDestinationsService.create$(slug);
  }

  @Put(':id')
  @ApiOkResponse({ type: DestinationDto })
  update$(
    @Param('id') id: string,
    @Body() destinationUpdate: DestinationUpdateDto
  ): Observable<Destination> {
    return this.adminDestinationsService.update$(id, destinationUpdate);
  }

  @Post(':id/post')
  @HttpCode(204)
  post$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminDestinationsService.post$(id);
  }

  @Get()
  @ApiOkResponse({ type: [DestinationDto] })
  findAll$(): Observable<Destination[]> {
    return this.adminDestinationsService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: DestinationDto })
  findOne$(
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<Destination> {
    return this.adminDestinationsService.findOne$(id);
  }

  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminDestinationsService.delete$(id);
  }
}
