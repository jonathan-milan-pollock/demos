import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  MediaProvider,
} from '@dark-rush-photography/api/data';
import { AdminMediaController } from './admin-media.controller';
import { AdminMediaService } from './admin-media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminMediaController],
  providers: [MediaProvider, AdminMediaService],
})
export class AdminMediaModule {}
