import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminDestinationsService } from './admin-destinations.service';
import { AdminDestinationsController } from './admin-destinations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminDestinationsController],
  providers: [AdminDestinationsService, EntityProvider],
})
export class AdminDestinationsModule {}
