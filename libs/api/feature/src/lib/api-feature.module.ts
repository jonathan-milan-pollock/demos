import { Module } from '@nestjs/common';

import { DestinationsController } from './destinations/destinations.controller';
import { DestinationsService } from './destinations/destinations.service';

@Module({
  controllers: [DestinationsController],
  providers: [DestinationsService],
  exports: [],
})
export class ApiFeatureModule {}
