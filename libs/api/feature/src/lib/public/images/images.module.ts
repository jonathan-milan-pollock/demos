import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  ImageProvider,
} from '@dark-rush-photography/api/data';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImageProvider],
})
export class ImagesModule {}
