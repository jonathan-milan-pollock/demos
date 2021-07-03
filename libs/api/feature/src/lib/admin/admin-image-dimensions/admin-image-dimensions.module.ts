import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ContentProvider,
  Document,
  DocumentSchema,
  ServerlessMediaProvider,
} from '@dark-rush-photography/api/data';
import { AdminImageDimensionsService } from './admin-image-dimensions.service';
import { AdminImageDimensionsController } from './admin-image-dimensions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminImageDimensionsController],
  providers: [
    AdminImageDimensionsService,
    ContentProvider,
    ServerlessMediaProvider,
  ],
})
export class AdminImageDimensionsModule {}
