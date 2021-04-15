import { Controller, Get, Header } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello';
  }
}
