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

import {
  Destination,
  DestinationAdminDto,
  DestinationCreateDto,
  DestinationUpdateDto,
} from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminDestinationsService } from './admin-destinations.service';

@Controller({ path: 'admin/destinations', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Destinations')
export class AdminDestinationsController {
  constructor(
    private readonly adminDestinationsService: AdminDestinationsService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: DestinationAdminDto })
  create$(
    @Body() destinationCreate: DestinationCreateDto
  ): Observable<Destination> {
    return this.adminDestinationsService.create$(destinationCreate);
  }

  @Put(':id')
  @ApiOkResponse({ type: DestinationAdminDto })
  update$(
    @Param('id') id: string,
    @Body() destinationUpdate: DestinationUpdateDto
  ): Observable<Destination> {
    return this.adminDestinationsService.update$(id, destinationUpdate);
  }

  @Post(':id/post')
  @ApiOkResponse({ type: DestinationAdminDto })
  post$(@Param('id', ParseObjectIdPipe) id: string): Observable<Destination> {
    return this.adminDestinationsService.post$(id);
  }

  @Get()
  @ApiOkResponse({ type: [DestinationAdminDto] })
  findAll$(): Observable<Destination[]> {
    return this.adminDestinationsService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: DestinationAdminDto })
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
