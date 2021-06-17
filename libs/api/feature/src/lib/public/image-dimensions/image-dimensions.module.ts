import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageDimensionProvider,
} from '@dark-rush-photography/api/data';
import { ImageDimensionsController } from './image-dimensions.controller';
import { ImageDimensionsService } from './image-dimensions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [ImageDimensionsController],
  providers: [ImageDimensionProvider, ImageDimensionsService],
})
export class ImageDimensionsModule {}
