import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageDimensionProvider,
} from '@dark-rush-photography/api/data';
import { VideoDimensionsController } from './video-dimensions.controller';
import { VideoDimensionsService } from './video-dimensions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [VideoDimensionsController],
  providers: [ImageDimensionProvider, VideoDimensionsService],
})
export class VideoDimensionsModule {}
