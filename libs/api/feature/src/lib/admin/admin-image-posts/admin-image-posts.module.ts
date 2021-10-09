import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ContentAddBlobProvider,
  Document,
  DocumentSchema,
  ImageAddProvider,
  ImagePostsService,
} from '@dark-rush-photography/api/data';
import { AdminImagePostsController } from './admin-image-posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminImagePostsController],
  providers: [ImagePostsService, ImageAddProvider, ContentAddBlobProvider],
})
export class AdminImagePostsModule {}
