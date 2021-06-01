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

import { Destination } from '@dark-rush-photography/shared-types';
import { AdminDestinationsService } from './admin-destinations.service';

@Controller('admin/v1/destinations')
export class AdminDestinationsController {
  constructor(
    private readonly adminDestinationsService: AdminDestinationsService
  ) {}

  @Post()
  addDestination(@Body() destination: Destination): Observable<Destination> {
    return this.adminDestinationsService.addDestination(destination);
  }

  @Put(':id')
  updateDestination(
    @Param() id: string,
    @Body() destination: Destination
  ): Observable<Destination> {
    return this.adminDestinationsService.updateDestination(id, destination);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteDestination(@Param() id: string): Observable<void> {
    return this.adminDestinationsService.deleteDestination(id);
  }
}
