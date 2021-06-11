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

import { Destination } from '@dark-rush-photography/shared-types';
import { AdminDestinationsService } from './admin-destinations.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { CreateDestinationDto } from '@dark-rush-photography/api/types';

@Controller('admin/v1/destinations')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Destinations')
export class AdminDestinationsController {
  constructor(
    private readonly adminDestinationsService: AdminDestinationsService
  ) {}

  @Roles('admin')
  @Post()
  create(@Body() destination: CreateDestinationDto): Observable<Destination> {
    return this.adminDestinationsService.create(destination);
  }

  @Roles('admin')
  @Put(':id')
  update(
    @Param() id: string,
    @Body() destination: CreateDestinationDto
  ): Observable<Destination> {
    return this.adminDestinationsService.update(id, destination);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() id: string): Observable<void> {
    return this.adminDestinationsService.delete(id);
  }
}
