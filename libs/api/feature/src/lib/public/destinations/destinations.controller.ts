import { Controller, Param, Get } from '@nestjs/common';

import { Observable } from 'rxjs';

import { Destination } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { DestinationsService } from './destinations.service';

@Controller('v1/destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Public()
  @Get()
  getDestinations(): Observable<Destination[]> {
    return this.destinationsService.getDestinations();
  }

  @Public()
  @Get(':id')
  getDestination(@Param() id: string): Observable<Destination> {
    return this.destinationsService.getDestination(id);
  }
}
