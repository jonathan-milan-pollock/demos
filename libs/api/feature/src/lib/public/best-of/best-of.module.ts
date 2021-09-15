import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BestOfProvider,
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
import { BestOfService } from './best-of.service';
import { BestOfController } from './best-of.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [BestOfController],
  providers: [
    BestOfService,
    EntityPublicProvider,
    BestOfProvider,
    ImageProvider,
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class BestOfModule {}
