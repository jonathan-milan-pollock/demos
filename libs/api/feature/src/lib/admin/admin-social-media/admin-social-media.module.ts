import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminSocialMediaService } from './admin-social-media.service';
import { AdminSocialMediaController } from './admin-social-media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminSocialMediaController],
  providers: [AdminSocialMediaService, EntityProvider],
})
export class AdminSocialMediaModule {}
