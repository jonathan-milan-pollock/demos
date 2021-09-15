import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  DestinationProvider,
  Document,
  DocumentSchema,
  EntityPublicProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUploadProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
} from '@dark-rush-photography/api/data';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [DestinationsController],
  providers: [
    DestinationsService,
    EntityPublicProvider,
    DestinationProvider,
    ImageProvider,
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class DestinationsModule {}
