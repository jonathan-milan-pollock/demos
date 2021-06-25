import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
  ImageDimensionProvider,
  ServerlessProvider,
} from '@dark-rush-photography/api/data';
import { AdminImageDimensionsController } from './admin-image-dimensions.controller';
import { AdminImageDimensionsService } from './admin-image-dimensions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminImageDimensionsController],
  providers: [
    ServerlessProvider,
    DocumentModelProvider,
    ImageDimensionProvider,
    AdminImageDimensionsService,
  ],
})
export class AdminImageDimensionsModule {}
