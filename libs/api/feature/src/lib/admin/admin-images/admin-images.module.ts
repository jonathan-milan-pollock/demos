import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageProvider,
} from '@dark-rush-photography/api/data';
import { AdminImagesController } from './admin-images.controller';
import { AdminImagesService } from './admin-images.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminImagesController],
  providers: [ImageProvider, AdminImagesService],
})
export class AdminImagesModule {}
