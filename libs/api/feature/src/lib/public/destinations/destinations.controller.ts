import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Destination } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { DestinationsService } from './destinations.service';

@Controller('v1/destinations')
@Public()
@ApiTags('Destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  findAll(): Observable<Destination[]> {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: string): Observable<Destination> {
    return this.destinationsService.findOne(id);
  }
}
