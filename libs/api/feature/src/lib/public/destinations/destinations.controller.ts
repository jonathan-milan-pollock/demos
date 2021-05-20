import { Controller, Param, Get } from '@nestjs/common';

import { Destination } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  @Public()
  async getDestinations(): Promise<Destination[]> {
    return await this.destinationsService.getDestinations();
  }

  @Get(':id')
  @Public()
  async getDestination(@Param() id: string): Promise<Destination> {
    return this.destinationsService.getDestination(id);
  }
}
