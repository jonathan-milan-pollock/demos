import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { AdminEntitiesModule } from './admin-entities/admin-entities.module';
import { AdminImagesModule } from './admin-images/admin-images.module';
import { AdminMediaProcessesModule } from './admin-media-processes/admin-media-processes.module';
import { AdminVideosModule } from './admin-videos/admin-videos.module';
import { AdminDropboxModule } from './admin-dropbox/admin-dropbox.module';

@Module({
  imports: [
    //TODO: Don't believe this is needed
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AdminDropboxModule,
    AdminEntitiesModule,
    AdminImagesModule,
    AdminMediaProcessesModule,
    AdminVideosModule,
  ],
})
export class AdminModule {}
