import { Controller, Get } from '@nestjs/common';

import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  getHello(): string {
    return 'Hello';
  }
}
