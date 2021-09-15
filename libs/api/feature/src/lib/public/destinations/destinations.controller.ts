import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  DestinationDto,
  DestinationMinimalDto,
} from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { DestinationsService } from './destinations.service';

@Controller({ path: 'destinations', version: '1' })
@Public()
@ApiTags('Public Destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  @ApiOkResponse({ type: [DestinationMinimalDto] })
  findAll$(): Observable<DestinationMinimalDto[]> {
    return this.destinationsService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: DestinationDto })
  findOne$(
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<DestinationDto> {
    return this.destinationsService.findOne$(id);
  }
}
