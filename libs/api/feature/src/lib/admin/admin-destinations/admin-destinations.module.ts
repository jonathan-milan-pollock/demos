import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  DestinationProvider,
  Document,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminDestinationsController } from './admin-destinations.controller';
import { AdminDestinationsService } from './admin-destinations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminDestinationsController],
  providers: [DestinationProvider, AdminDestinationsService],
})
export class AdminDestinationsModule {}
